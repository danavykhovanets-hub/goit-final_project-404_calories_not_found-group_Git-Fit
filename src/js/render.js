import { getFilters } from '../api/requests/getFilters.js';
import { renderPagination } from './pagination.js';

const DEFAULT_FILTER = 'Muscles';

let currentFilter = DEFAULT_FILTER;
let currentPage = 1;

const refs = {
  categoriesContainer: document.querySelector('.categories-by-muscles'),
  categoriesList: document.querySelector('.categories-by-muscles-list'),
  exercisesContainer: document.querySelector('.exercises'),
  paginationContainer: document.querySelector('[data-home-pagination]'),
  searchForm: document.querySelector('.filters-search-form'),
  filtersSlash: document.querySelector('.filters-slash'),
  selectedCategory: document.querySelector('.filters-selected-category'),
};

export async function renderCategories({
                                         filter = currentFilter,
                                         page = currentPage,
                                       } = {}) {
  currentFilter = filter;
  currentPage = page;

  showCategoriesView();

  const limit = getCategoriesLimit();
  const data = await getFilters({
    filter: currentFilter,
    page: currentPage,
    limit,
  });

  refs.categoriesList.innerHTML = createCategoriesMarkup(data.results);

  renderPagination({
    container: refs.paginationContainer,
    page: Number(data.page),
    totalPages: data.totalPages,
    onPageChange: nextPage => {
      renderCategories({
        filter: currentFilter,
        page: nextPage,
      });
    },
  });
}

function createCategoriesMarkup(categories) {
  return categories
    .map(({ filter, name, imgURL }) => {
      const displayName = formatDisplayText(name);

      return `
        <li class="categories-by-muscles-item">
          <img
            src="${imgURL}"
            alt="${displayName}"
            class="categories-by-muscles-img"
            loading="lazy"
          >
          <button
            type="button"
            class="category-card-wrapper"
            data-category="${name}"
            data-filter="${filter}"
          >
            <div class="category-card-content">
              <h3 class="category-card-name">${displayName}</h3>
              <p class="category-card-filter">${filter}</p>
            </div>
          </button>
        </li>
      `;
    })
    .join('');
}

function showCategoriesView() {
  refs.categoriesContainer?.classList.remove('is-hidden');
  refs.exercisesContainer?.classList.add('is-hidden');
  refs.searchForm?.classList.add('is-hidden');
  refs.filtersSlash?.classList.add('is-hidden');
  refs.selectedCategory?.classList.add('is-hidden');
}

function getCategoriesLimit() {
  return window.innerWidth < 768 ? 9 : 12;
}

function formatDisplayText(value) {
  return value
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
