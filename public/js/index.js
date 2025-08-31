document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-bar');
  const categorySelect = document.getElementById('category-filter');
  function filterProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    const cards = document.querySelectorAll('.producto-card');
    cards.forEach(card => {
      const name = card.querySelector('h3').textContent.trim().toLowerCase();
      const cardCategory = card.dataset.category || '';
      const matchesName = !searchTerm || name === searchTerm;
      const matchesCategory = !category || cardCategory === category;
      card.style.display = matchesName && matchesCategory ? 'block' : 'none';
    });
  }

  function initProductCard(card) {
    const addButton = card.querySelector('.btn-primary');
    const quantityInput = card.querySelector('.cantidad');
    const decreaseBtn = card.querySelector('.quantity-btn.decrease');
    const increaseBtn = card.querySelector('.quantity-btn.increase');
    const stockElement = card.querySelector('.stock');
    const name = card.querySelector('h3').textContent.trim();
    const viewMoreBtn = card.querySelector('.ver-mas');

    if (viewMoreBtn) {
      viewMoreBtn.addEventListener('click', () => {
        const description = viewMoreBtn.previousElementSibling;
        description.classList.toggle('expandida');
        viewMoreBtn.textContent = description.classList.contains('expandida') ? 'ver menos' : 'ver más';
      });
    }

    const stockData = getProductStock();
    if (stockData[name] === undefined) {
      stockData[name] = DEFAULT_STOCK;
      saveProductStock(stockData);
    }

    function updateStockDisplay() {
      const stock = getAvailableStock(name);
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
      if (value < getAvailableStock(name)) {
        quantityInput.value = value + 1;
      }
    });

    quantityInput.addEventListener('input', () => {
      let value = parseInt(quantityInput.value, 10);
      const available = getAvailableStock(name);
      if (isNaN(value) || value < 1) {
        quantityInput.value = 1;
      } else if (value > available) {
        quantityInput.value = available;
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

      if (quantity > getAvailableStock(name)) {
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

      adjustProductStock(name, -quantity);
      updateStockDisplay();
    });
  }

  function renderStoredProducts() {
    const grid = document.querySelector('.productos-grid');
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const existingNames = Array.from(document.querySelectorAll('.producto-card h3')).map(h => h.textContent.trim());
    productos.forEach(p => {
      if (!existingNames.includes(p.nombre)) {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.dataset.category = p.categoria || '';
        card.innerHTML = `
          <img src="${p.imagen || '../assets/LevelUpLogo.png'}" alt="${p.nombre}">
          <h3>${p.nombre}</h3>
          <p class="descripcion texto-secundario">${p.descripcion}</p>
          <span class="ver-mas texto-secundario">ver más</span>
          <p class="precio texto-secundario">$${p.precio.toLocaleString('es-CL')}</p>
          <p class="stock texto-secundario">Stock: ${p.stock}</p>
          <div class="quantity-selector">
            <button class="quantity-btn decrease">-</button>
            <input type="number" class="cantidad" value="1" min="1">
            <button class="quantity-btn increase">+</button>
          </div>
          <button class="btn-primary">Agregar al carrito</button>
        `;
        grid.appendChild(card);
        initProductCard(card);
      }
    });
  }
  document.querySelectorAll('.producto-card').forEach(initProductCard);
  renderStoredProducts();

  searchInput.addEventListener('input', filterProducts);
  categorySelect.addEventListener('change', filterProducts);
  updateCartIcon();
  filterProducts();
});