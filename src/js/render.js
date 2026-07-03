import { getExercisesByCategory } from '../api/requests/getExercisesByCategory.js';
import { getFilters } from '../api/requests/getFilters.js';
import { renderExerciseCard } from './render-exercise-card.js';
import { renderPagination } from './pagination.js';

const DEFAULT_FILTER = 'Muscles';
const FILTER_PARAM_MAP = {
  Muscles: 'muscles',
  'Body parts': 'bodypart',
  Equipment: 'equipment',
};

let currentFilter = DEFAULT_FILTER;
let currentPage = 1;
let currentExerciseParams = null;

const refs = {
  categoriesContainer: document.querySelector('.categories-by-muscles'),
  categoriesList: document.querySelector('.categories-by-muscles-list'),
  exercisesContainer: document.querySelector('.exercises'),
  exercisesList: document.querySelector('.exercises-list'),
  paginationContainer: document.querySelector('[data-home-pagination]'),
  searchForm: document.querySelector('.filters-search-form'),
  filtersSlash: document.querySelector('.filters-slash'),
  selectedCategory: document.querySelector('.filters-selected-category'),
};

refs.categoriesList?.addEventListener('click', onCategoryCardClick);

export async function renderCategories({
                                         filter = currentFilter,
                                         page = currentPage,
                                       } = {}) {
  currentFilter = filter;
  currentPage = page;
  currentExerciseParams = null;

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

async function renderExercises({ page = 1 } = {}) {
  if (!currentExerciseParams) {
    return;
  }

  const limit = getExercisesLimit();
  const data = await getExercisesByCategory({
    ...currentExerciseParams,
    page,
    limit,
  });

  showExercisesView();

  refs.exercisesList.innerHTML = data.results
    .map(exercise => renderExerciseCard(exercise))
    .join('');

  renderPagination({
    container: refs.paginationContainer,
    page: Number(data.page),
    totalPages: data.totalPages,
    onPageChange: nextPage => {
      renderExercises({ page: nextPage });
    },
  });
}

function onCategoryCardClick(event) {
  const categoryButton = event.target.closest('.category-card-wrapper');

  if (!categoryButton) {
    return;
  }

  const { category, filter } = categoryButton.dataset;
  const apiParam = FILTER_PARAM_MAP[filter];

  if (!apiParam || !category) {
    return;
  }

  currentExerciseParams = {
    [apiParam]: category,
  };

  updateSelectedCategory(category);
  renderExercises({ page: 1 });
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

  if (refs.selectedCategory) {
    refs.selectedCategory.textContent = '';
  }
}

function showExercisesView() {
  refs.categoriesContainer?.classList.add('is-hidden');
  refs.exercisesContainer?.classList.remove('is-hidden');
  refs.searchForm?.classList.add('is-hidden');
  refs.filtersSlash?.classList.remove('is-hidden');
  refs.selectedCategory?.classList.remove('is-hidden');
}

function updateSelectedCategory(category) {
  if (!refs.selectedCategory) {
    return;
  }

  refs.selectedCategory.textContent = formatDisplayText(category);
}

function getCategoriesLimit() {
  return window.innerWidth < 768 ? 9 : 12;
}

function getExercisesLimit() {
  return 10;
}

function formatDisplayText(value) {
  return value
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}