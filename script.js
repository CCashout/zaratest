function toggleMenu() {
    const menu = document.getElementById('navMenu');
    menu.classList.toggle('active');
}

function expandSearch() {
    const results = document.getElementById('searchResults');
    results.style.display = 'block';
    results.innerHTML = '<p>Women’s Jackets</p><p>Men’s Shirts</p>'; // Mock search results
    document.querySelector('.search-bar input').style.width = '100vw';
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
}

function closeModal() {
    document.getElementById('itemModal').style.display = 'none';
}

function addToCart() {
    alert('Added to cart!');
}
