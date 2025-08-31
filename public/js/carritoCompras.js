document.addEventListener('DOMContentLoaded', () => {
  if (!isUserLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }
  const itemsContainer = document.getElementById('cart-items');
  const totalElement = document.getElementById('total');

  function renderCart() {
    const cart = getCart();
    itemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('cart-item');
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="info">
          <h3>${item.name}</h3>
          <p class="descripcion texto-secundario">${item.description}</p>
          <p class="precio texto-secundario">$${item.price.toLocaleString('es-CL')}</p>
        </div>
        <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="cantidad">
        <p class="subtotal">$${(item.price * item.quantity).toLocaleString('es-CL')}</p>
        <button class="remove" data-index="${index}">🗑️</button>
      `;
      itemsContainer.appendChild(itemDiv);
      total += item.price * item.quantity;
    });

    totalElement.textContent = total.toLocaleString('es-CL');
    updateCartIcon();
  }

  itemsContainer.addEventListener('input', (e) => {
    if (e.target.classList.contains('cantidad')) {
      const index = e.target.dataset.index;
      const cart = getCart();
      cart[index].quantity = parseInt(e.target.value, 10);
      saveCart(cart);
      renderCart();
    }
  });

  itemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove')) {
      const index = e.target.dataset.index;
      const cart = getCart();
      cart.splice(index, 1);
      saveCart(cart);
      renderCart();
    }
  });

  renderCart();
});