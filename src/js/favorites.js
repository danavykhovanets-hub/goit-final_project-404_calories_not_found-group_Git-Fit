import { getQuoteOfTheDay } from './quote.js';
import {
  createFavoriteExercise,
  favoritesStorage,
} from '../lib/favorites-storage.js';
import { renderExerciseCard } from './render-exercise-card.js';
import { hideLoader, showLoader } from './loader.js';

const SELECTORS = {
  root: '[data-favorites-root]',
  quoteText: '[data-quote-text]',
  quoteAuthor: '[data-quote-author]',
  emptyState: '[data-empty-state]',
  listSection: '[data-list-section]',
  list: '[data-favorites-list]',
  paginationSlot: '[data-pagination-slot]',
};

const FALLBACK_QUOTE = {
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
  if (!document.querySelector(SELECTORS.root)) {
    return;
  }

  showLoader();

  try {
    bindFavoritesEvents();
    await renderQuote();
    renderFavoritesState();
  } finally {
    hideLoader();
  }
};

const renderQuote = async () => {
  const quoteTextEl = document.querySelector(SELECTORS.quoteText);
  const quoteAuthorEl = document.querySelector(SELECTORS.quoteAuthor);

  if (!quoteTextEl || !quoteAuthorEl) {
    return;
  }

  const quote = (await getQuoteOfTheDay()) ?? FALLBACK_QUOTE;

  quoteTextEl.textContent = quote.quote ?? FALLBACK_QUOTE.quote;
  quoteAuthorEl.textContent = quote.author ?? FALLBACK_QUOTE.author;
};

const renderFavoritesState = () => {
  const root = document.querySelector(SELECTORS.root);
  const emptyState = document.querySelector(SELECTORS.emptyState);
  const listSection = document.querySelector(SELECTORS.listSection);
  const list = document.querySelector(SELECTORS.list);
  const paginationSlot = document.querySelector(SELECTORS.paginationSlot);

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
    .map(exercise =>
      favoritesCardRenderer(exercise, {
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
  const list = document.querySelector(SELECTORS.list);

  if (!list || list.dataset.bound === 'true') {
    return;
  }

  list.dataset.bound = 'true';

  list.addEventListener('click', event => {
    const removeButton = event.target.closest(
      '[data-action="favorite-exercise:remove"]'
    );

    if (removeButton) {
      handleFavoriteRemoval(removeButton.dataset.exerciseId);
      return;
    }

    const startButton = event.target.closest(
      '[data-action="favorite-exercise:start"]'
    );

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
  const nextFavorites = favorites.filter(
    exercise => exercise._id !== exerciseId
  );

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

  return savedFavorites
    .map(createFavoriteExercise)
    .filter(exercise => exercise._id);
};

const renderFavoriteCard = exercise => {
  return renderExerciseCard(exercise, {
    listItemClassName: 'exercises-item favorites-exercises-item',
    metaType: 'favorite',
    onStartAction: 'favorite-exercise:start',
    onMetaAction: 'favorite-exercise:remove',
  });
};

favoritesCardRenderer = renderFavoriteCard;

initFavoritesPage();
