import { getQuoteOfTheDay } from './quote.js';
import {
  createFavoriteExercise,
  favoritesStorage,
} from '../lib/favorites-storage.js';

const selectors = {
  root: '[data-favorites-root]',
  quoteText: '[data-quote-text]',
  quoteAuthor: '[data-quote-author]',
  emptyState: '[data-empty-state]',
  listSection: '[data-list-section]',
  list: '[data-favorites-list]',
  paginationSlot: '[data-pagination-slot]',
};

const fallbackQuote = {
  quote:
    "A lot of times I find that people who are blessed with the most talent don't ever develop that attitude, and the ones who aren't blessed in that way are the most competitive and have the biggest heart.",
  author: 'Tom Brady',
};

let favoritesCardRenderer = null;
let favoritesPaginationRenderer = null;

export const setFavoritesCardRenderer = renderer => {
  if (typeof renderer === 'function') {
    favoritesCardRenderer = renderer;
    renderFavoritesState();
  }
};

export const setFavoritesPaginationRenderer = renderer => {
  if (typeof renderer === 'function') {
    favoritesPaginationRenderer = renderer;
    renderFavoritesState();
  }
};

export const initFavoritesPage = async () => {
  if (!document.querySelector(selectors.root)) {
    return;
  }

  bindFavoritesEvents();
  await renderQuote();
  renderFavoritesState();
};

const renderQuote = async () => {
  const quoteTextEl = document.querySelector(selectors.quoteText);
  const quoteAuthorEl = document.querySelector(selectors.quoteAuthor);

  if (!quoteTextEl || !quoteAuthorEl) {
    return;
  }

  const quote = (await getQuoteOfTheDay()) ?? fallbackQuote;

  quoteTextEl.textContent = quote.quote ?? fallbackQuote.quote;
  quoteAuthorEl.textContent = quote.author ?? fallbackQuote.author;
};

const renderFavoritesState = () => {
  const root = document.querySelector(selectors.root);
  const emptyState = document.querySelector(selectors.emptyState);
  const listSection = document.querySelector(selectors.listSection);
  const list = document.querySelector(selectors.list);
  const paginationSlot = document.querySelector(selectors.paginationSlot);

  if (!root || !emptyState || !listSection || !list || !paginationSlot) {
    return;
  }

  const favorites = getStoredFavorites();
  const hasFavorites = favorites.length > 0;

  root.classList.toggle('is-empty', !hasFavorites);
  root.classList.toggle('is-filled', hasFavorites);

  emptyState.classList.toggle('is-hidden', hasFavorites);
  listSection.classList.toggle('is-hidden', !hasFavorites);

  if (!hasFavorites) {
    list.innerHTML = '';
    paginationSlot.innerHTML = '';
    paginationSlot.classList.add('is-hidden');
    return;
  }

  list.innerHTML = favorites
    .map((exercise, index) =>
      favoritesCardRenderer(exercise, {
        index,
        onStartAction: 'favorite-exercise:start',
        onRemoveAction: 'favorite-exercise:remove',
      })
    )
    .join('');

  renderPaginationSlot({
    paginationSlot,
    totalItems: favorites.length,
  });
};

const renderPaginationSlot = ({ paginationSlot, totalItems }) => {
  paginationSlot.innerHTML = '';

  if (typeof favoritesPaginationRenderer !== 'function') {
    paginationSlot.classList.add('is-hidden');
    return;
  }

  favoritesPaginationRenderer({
    container: paginationSlot,
    totalItems,
    pageSize: totalItems,
    currentPage: 1,
  });

  paginationSlot.classList.toggle(
    'is-hidden',
    paginationSlot.childElementCount === 0 && !paginationSlot.textContent.trim()
  );
};

const bindFavoritesEvents = () => {
  const list = document.querySelector(selectors.list);

  if (!list || list.dataset.bound === 'true') {
    return;
  }

  list.dataset.bound = 'true';

  list.addEventListener('click', event => {
    const removeButton = event.target.closest('[data-action="favorite-exercise:remove"]');

    if (removeButton) {
      handleFavoriteRemoval(removeButton.dataset.exerciseId);
      return;
    }

    const startButton = event.target.closest('[data-action="favorite-exercise:start"]');

    if (startButton) {
      document.dispatchEvent(
        new CustomEvent('favorite-exercise:start', {
          detail: { exerciseId: startButton.dataset.exerciseId },
        })
      );
    }
  });
};

const handleFavoriteRemoval = exerciseId => {
  const favorites = getStoredFavorites();
  const nextFavorites = favorites.filter(exercise => exercise._id !== exerciseId);

  favoritesStorage.save(nextFavorites);

  document.dispatchEvent(
    new CustomEvent('favorite-exercise:removed', {
      detail: { exerciseId, favorites: nextFavorites },
    })
  );

  renderFavoritesState();
};

const getStoredFavorites = () => {
  const savedFavorites = favoritesStorage.load([]);

  if (!Array.isArray(savedFavorites)) {
    return [];
  }

  return savedFavorites.map(createFavoriteExercise).filter(exercise => exercise._id);
};

const createFallbackFavoriteCardMarkup = exercise => {
  return `
    <li class="favorites-exercises-item">
      <article class="favorite-exercise-card" data-exercise-id="${exercise._id}">
        <div class="favorite-exercise-card__top">
          <div class="favorite-exercise-card__badge-wrap">
            <span class="favorite-exercise-card__badge">Workout</span>
            <button
              class="favorite-exercise-card__remove"
              type="button"
              aria-label="Remove ${escapeHtml(exercise.name)} from favorites"
              data-action="favorite-exercise:remove"
              data-exercise-id="${exercise._id}"
            >
              <svg width="16" height="16" aria-hidden="true">
                <use href="./img/icons.svg#trash"></use>
              </svg>
            </button>
          </div>

          <button
            class="favorite-exercise-card__start"
            type="button"
            data-action="favorite-exercise:start"
            data-exercise-id="${exercise._id}"
          >
            Start
            <svg width="16" height="16" aria-hidden="true">
              <use href="./img/icons.svg#arrow_forward_one_page"></use>
            </svg>
          </button>
        </div>

        <div class="favorite-exercise-card__main">
          <div class="favorite-exercise-card__icon-wrap" aria-hidden="true">
            <svg width="16" height="16">
              <use href="./img/icons.svg#running_figure_white"></use>
            </svg>
          </div>
          <h3 class="favorite-exercise-card__title">${escapeHtml(exercise.name)}</h3>
        </div>

        <ul class="favorite-exercise-card__meta" aria-label="Exercise details">
          <li class="favorite-exercise-card__meta-item">
            Burned calories: <span>${exercise.burnedCalories} / ${exercise.time} min</span>
          </li>
          <li class="favorite-exercise-card__meta-item">
            Body part: <span>${escapeHtml(exercise.bodyPart)}</span>
          </li>
          <li class="favorite-exercise-card__meta-item">
            Target: <span>${escapeHtml(exercise.target)}</span>
          </li>
        </ul>
      </article>
    </li>
  `;
};

const escapeHtml = (value = '') => {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
};

favoritesCardRenderer = createFallbackFavoriteCardMarkup;

initFavoritesPage();
