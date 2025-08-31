function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartIcon() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const icon = document.getElementById('cart-icon');
  const countSpan = document.getElementById('cart-count');
  if (!icon || !countSpan) return;
  if (count > 0) {
    icon.style.display = 'flex';
    countSpan.textContent = count;
  } else {
    icon.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', updateCartIcon);