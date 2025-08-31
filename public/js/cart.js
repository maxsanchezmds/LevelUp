function isUserLoggedIn() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  return usuarios.some(u => u.sesionActiva);
}

function getCart() {
  if (!isUserLoggedIn()) {
    return [];
  }
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  if (!isUserLoggedIn()) {
    alert('Debes iniciar sesión para administrar el carrito.');
    return;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartIcon() {
  const icon = document.getElementById('cart-icon');
  const countSpan = document.getElementById('cart-count');
  if (!icon || !countSpan) return;
  if (!isUserLoggedIn()) {
    icon.style.display = 'none';
    return;
  }

  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (count > 0) {
    icon.style.display = 'flex';
    countSpan.textContent = count;
  } else {
    icon.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', updateCartIcon);