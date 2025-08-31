document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-bar');
  const categorySelect = document.getElementById('category-filter');
  const cards = document.querySelectorAll('.producto-card');
  const viewMoreButtons = document.querySelectorAll('.ver-mas');

  function filterProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;

    cards.forEach(card => {
      const name = card.querySelector('h3').textContent.trim().toLowerCase();
      const cardCategory = card.dataset.category;

      const matchesName = !searchTerm || name === searchTerm;
      const matchesCategory = !category || cardCategory === category;

      card.style.display = matchesName && matchesCategory ? 'block' : 'none';
    });
  }

  viewMoreButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const description = btn.previousElementSibling;
      description.classList.toggle('expandida');
      btn.textContent = description.classList.contains('expandida') ? 'ver menos' : 'ver más';
    });
  });

  // ----- Carrito de compras -----
  const productCards = document.querySelectorAll('.producto-card');
  productCards.forEach(card => {
    const addButton = card.querySelector('.btn-primary');
    const quantityInput = card.querySelector('.cantidad');

    addButton.addEventListener('click', () => {
      const name = card.querySelector('h3').textContent.trim();
      const price = parseInt(card.querySelector('.precio').textContent.replace(/[^0-9]/g, ''), 10);
      const description = card.querySelector('.descripcion').textContent.trim();
      const image = card.querySelector('img').getAttribute('src');
      const quantity = parseInt(quantityInput.value, 10);

      let cart = getCart();
      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ name, price, quantity, description, image });
      }
      saveCart(cart);
      updateCartIcon();
    });
  });


  searchInput.addEventListener('input', filterProducts);
  categorySelect.addEventListener('change', filterProducts);
  updateCartIcon();
});