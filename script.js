let cart = [];

function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

function toggleCart() {
    const cartPanel = document.getElementById('cartPanel');
    cartPanel.classList.toggle('active');
}

function searchItems(query) {
    const results = document.getElementById('searchResults');
    const grid = document.getElementById('productGrid');
    const items = grid.getElementsByClassName('product-item');
    results.style.display = query ? 'block' : 'none';
    results.innerHTML = '';

    const filteredItems = Array.from(items).filter(item => {
        const name = item.getAttribute('data-name').toLowerCase();
        return name.includes(query.toLowerCase());
    });

    filteredItems.forEach(item => {
        const p = document.createElement('p');
        p.textContent = `${item.getAttribute('data-name')} - ${item.getAttribute('data-price')}`;
        p.onclick = () => showItemModal(
            item.getAttribute('data-name'),
            item.getAttribute('data-price'),
            item.getAttribute('data-sizes'),
            item.getAttribute('data-desc'),
            item.querySelector('img').src
        );
        results.appendChild(p);
    });

    Array.from(items).forEach(item => {
        item.style.display = filteredItems.includes(item) || !query ? 'block' : 'none';
    });
}

function showItemModal(title, price, sizes, desc, imageSrc) {
    const modal = document.getElementById('itemModal');
    modal.style.display = 'block';
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalPrice').textContent = price;
    const sizeSelect = document.getElementById('modalSizes');
    sizeSelect.innerHTML = sizes.split(',').map(s => `<option>${s}</option>`).join('');
    document.getElementById('modalDesc').textContent = desc;
}

function closeModal() {
    document.getElementById('itemModal').style.display = 'none';
}

function addToCart() {
    const title = document.getElementById('modalTitle').textContent;
    const price = document.getElementById('modalPrice').textContent;
    const size = document.getElementById('modalSizes').value;
    cart.push({ title, price, size });
    updateCart();
    closeModal();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.title} (${item.size}) - ${item.price}`;
        cartItems.appendChild(li);
        total += parseFloat(item.price.replace('$', ''));
    });
    document.getElementById('cartTotal').textContent = total.toFixed(2);
    cartCount.textContent = cart.length;
}

function clearCart() {
    cart = [];
    updateCart();
}

// PayPal Integration
paypal.Buttons({
    createOrder: function(data, actions) {
        const total = document.getElementById('cartTotal').textContent;
        if (total === '0.00' || cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: total,
                    currency_code: 'USD'
                }
            }],
            application_context: {
                shipping_preference: 'NO_SHIPPING' // No shipping for digital-like goods
            }
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Payment completed successfully! Transaction ID: ' + details.id);
            clearCart();
            toggleCart();
        });
    },
    onError: function(err) {
        alert('An error occurred during payment. Please try again.');
        console.error(err);
    }
}).render('#paypal-button-container');

// Attach click events to product items
document.addEventListener('DOMContentLoaded', () => {
    const items = document.getElementsByClassName('product-item');
    Array.from(items).forEach(item => {
        item.onclick = () => showItemModal(
            item.getAttribute('data-name'),
            item.getAttribute('data-price'),
            item.getAttribute('data-sizes'),
            item.getAttribute('data-desc'),
            item.querySelector('img').src
        );
    });
    updateCart();
});
