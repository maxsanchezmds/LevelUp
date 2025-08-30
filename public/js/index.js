document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-bar');
  const categorySelect = document.getElementById('category-filter');
  const cards = document.querySelectorAll('.producto-card');

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

  searchInput.addEventListener('input', filterProducts);
  categorySelect.addEventListener('change', filterProducts);
});