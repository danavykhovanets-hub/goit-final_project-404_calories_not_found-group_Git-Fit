import { renderCategories } from './render.js';

export function initFilters() {
  const filterButtons = document.querySelectorAll('.filters-btn');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach(filterButton => {
        filterButton.classList.toggle('is-active', filterButton === button);
      });

      renderCategories({
        filter: selectedFilter,
        page: 1,
      });
    });
  });
}
