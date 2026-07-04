import { getQuoteOfTheDay } from './quote.js';
import {
  createFavoriteExercise,
  favoritesStorage,
} from '../lib/favorites-storage.js';
import { renderExerciseCard } from './render-exercise-card.js';
import { renderPagination } from './pagination.js';
import { hideLoader, showLoader } from './loader.js';
import { initSubscription } from './subscription.js';
import { initScrollFade } from './scroll-fade.js';

const SELECTORS = {
  root: '[data-favorites-root]',
  quoteText: '[data-quote-text]',
  quoteAuthor: '[data-quote-author]',
  quoteAuthorLink: '[data-quote-author-link]',
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

const FAVORITES_PAGE_SIZE = 10;

let favoritesCardRenderer = null;
let currentPage = 1;

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
  const quoteAuthorLinkEl = document.querySelector(SELECTORS.quoteAuthorLink);

  if (!quoteTextEl || !quoteAuthorEl) {
    return;
  }

  const quote = (await getQuoteOfTheDay()) ?? FALLBACK_QUOTE;
  const author = quote.author ?? FALLBACK_QUOTE.author;

  quoteTextEl.textContent = quote.quote ?? FALLBACK_QUOTE.quote;
  quoteAuthorEl.textContent = author;
  
    if (quoteAuthorLinkEl) {
    quoteAuthorLinkEl.href = `https://www.google.com/search?q=${encodeURIComponent(
      author
    )}`;
  }

  initScrollFade('.favorites-quote__text-wrapper', '.favorites-quote__text');
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
  const totalPages = Math.ceil(favorites.length / FAVORITES_PAGE_SIZE);

  currentPage = hasFavorites ? Math.min(currentPage, totalPages) : 1;

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

  const paginatedFavorites = favorites.slice(
    (currentPage - 1) * FAVORITES_PAGE_SIZE,
    currentPage * FAVORITES_PAGE_SIZE
  );

  list.innerHTML = paginatedFavorites
    .map(exercise =>
      favoritesCardRenderer(exercise, {
        onStartAction: 'favorite-exercise:start',
        onRemoveAction: 'favorite-exercise:remove',
      })
    )
    .join('');

  renderPaginationSlot({
    paginationSlot,
    page: currentPage,
    totalItems: favorites.length,
  });
};

const renderPaginationSlot = ({ paginationSlot, page, totalItems }) => {
  paginationSlot.innerHTML = '';

  renderPagination({
    container: paginationSlot,
    page,
    totalPages: Math.ceil(totalItems / FAVORITES_PAGE_SIZE),
    onPageChange: nextPage => {
      currentPage = nextPage;
      renderFavoritesState();
    },
  });
};

const bindFavoritesEvents = () => {
  const list = document.querySelector(SELECTORS.list);

  if (!list || list.dataset.bound === 'true') {
    return;
  }

  list.dataset.bound = 'true';

  list.addEventListener(
    'wheel',
    event => {
      const item = event.target.closest('.exercise-info-item');
      if (!item) {
        return;
      }

      if (item.scrollWidth > item.clientWidth) {
        event.preventDefault();
        item.scrollLeft += event.deltaY;
      }
    },
    { passive: false }
  );

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

initSubscription();
initFavoritesPage();
