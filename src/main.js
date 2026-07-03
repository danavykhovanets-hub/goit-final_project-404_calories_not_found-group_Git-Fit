import { initFilters } from './js/filters.js';
import { renderCategories } from './js/render.js';
import { initSubscription } from './js/subscription.js';
import { initPagination } from './js/pagination.js';
import { initHeader } from './js/header.js';
import { initScrollUp } from './js/scroll-up.js';

import './js/modal.js';

/**
 * For those who will use iziToast notifications:
 * Do not forget to add those imports to your files
 * import iziToast from 'izitoast';
 * import 'izitoast/dist/css/iziToast.min.css';
 */

initHeader();
initFilters();
renderCategories();
initSubscription();
initPagination();
initScrollUp();
