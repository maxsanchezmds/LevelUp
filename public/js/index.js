document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-bar');
  const categorySelect = document.getElementById('category-filter');
  const cards = document.querySelectorAll('.producto-card');
  const viewMoreButtons = document.querySelectorAll('.ver-mas');

  const defaultStock = 10;
  let productStock = JSON.parse(localStorage.getItem('productStock')) || {};

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

    const decreaseBtn = card.querySelector('.quantity-btn.decrease');
    const increaseBtn = card.querySelector('.quantity-btn.increase');
    const stockElement = card.querySelector('.stock');
    const name = card.querySelector('h3').textContent.trim();

    if (productStock[name] === undefined) {
      productStock[name] = defaultStock;
    }

    function updateStockDisplay() {
      const stock = productStock[name];
      stockElement.textContent = `Stock: ${stock}`;
      quantityInput.max = stock;
      if (stock === 0) {
        addButton.disabled = true;
        addButton.textContent = 'Sin stock';
        quantityInput.value = 0;
        quantityInput.min = 0;
        quantityInput.disabled = true;
      }
    }

    updateStockDisplay();

    decreaseBtn.addEventListener('click', () => {
      let value = parseInt(quantityInput.value, 10);
      if (value > 1) {
        quantityInput.value = value - 1;
      }
    });

    increaseBtn.addEventListener('click', () => {
      let value = parseInt(quantityInput.value, 10);
      if (value < productStock[name]) {
        quantityInput.value = value + 1;
      }
    });

    quantityInput.addEventListener('input', () => {
      let value = parseInt(quantityInput.value, 10);
      if (isNaN(value) || value < 1) {
        quantityInput.value = 1;
      } else if (value > productStock[name]) {
        quantityInput.value = productStock[name];
      }
    });
    
    addButton.addEventListener('click', () => {
      if (!isUserLoggedIn()) {
        alert('Debes iniciar sesión para agregar productos al carrito.');
        window.location.href = 'login.html';
        return;
      }
      const price = parseInt(card.querySelector('.precio').textContent.replace(/[^0-9]/g, ''), 10);
      const description = card.querySelector('.descripcion').textContent.trim();
      const image = card.querySelector('img').getAttribute('src');
      const quantity = parseInt(quantityInput.value, 10);

      if (quantity > productStock[name]) {
        alert('No hay suficiente stock disponible.');
        return;
      }

      let cart = getCart();
      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ name, price, quantity, description, image });
      }
      saveCart(cart);
      updateCartIcon();

      productStock[name] -= quantity;
      localStorage.setItem('productStock', JSON.stringify(productStock));
      updateStockDisplay();
    });
  });


  searchInput.addEventListener('input', filterProducts);
  categorySelect.addEventListener('change', filterProducts);
  updateCartIcon();
  localStorage.setItem('productStock', JSON.stringify(productStock));
});