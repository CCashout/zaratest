let cart = [];

function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
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
            item.getAttribute('data-desc')
        );
        results.appendChild(p);
    });

    // Filter grid visibility
    Array.from(items).forEach(item => {
        item.style.display = filteredItems.includes(item) || !query ? 'block' : 'none';
    });
}

function showItemModal(title, price, sizes, desc) {
    const modal = document.getElementById('itemModal');
    modal.style.display = 'block';
    document.getElementById('modalImage').src = 'https://via.placeholder.com/600';
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalPrice').textContent = price;
    const sizeSelect = document.getElementById('modalSizes');
    sizeSelect.innerHTML = sizes.split(',').map(s => `<option>${s}</option>`).join('');
    document.getElementById('modalDesc').textContent = desc;

    // Add onclick to product items
    Array.from(document.getElementsByClassName('product-item')).forEach(item => {
        item.onclick = () => showItemModal(
            item.getAttribute('data-name'),
            item.getAttribute('data-price'),
            item.getAttribute('data-sizes'),
            item.getAttribute('data-desc')
        );
    });
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
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.title} (${item.size}) - ${item.price}`;
        cartItems.appendChild(li);
        total += parseFloat(item.price.replace('$', ''));
    });
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

function clearCart() {
    cart = [];
    updateCart();
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    updateCart();
});
