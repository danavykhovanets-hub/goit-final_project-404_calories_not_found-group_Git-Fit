import { initFilters } from './js/filters.js';
import { renderCategories } from './js/render.js';
import { initSubscription } from './js/subscription.js';
import { initPagination } from './js/pagination.js';
import { renderQuoteOfTheDay } from './js/quote.js';
import { initScrollUp } from './js/scroll-up.js';
import { initScrollFade } from './js/scroll-fade.js';

import './js/modal.js';

/**
 * For those who will use iziToast notifications:
 * Do not forget to add those imports to your files
 * import iziToast from 'izitoast';
 * import 'izitoast/dist/css/iziToast.min.css';
 */

initFilters();
renderCategories();
initSubscription();
initPagination();
renderQuoteOfTheDay();
initScrollUp();
initScrollFade('.motivation-text-wrapper', '.motivation-text');