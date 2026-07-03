const VISIBLE_PAGES_COUNT = 5;

export function initPagination() {}

export function renderPagination({ container, page, totalPages, onPageChange }) {
  if (!container) {
    return;
  }

  if (totalPages <= 1) {
    container.innerHTML = '';
    container.classList.add('is-hidden');
    container.onclick = null;
    return;
  }

  const currentPage = Number(page);
  const pages = getVisiblePages(currentPage, totalPages);

  container.innerHTML = pages
    .map(pageItem => {
      if (pageItem === 'dots') {
        return '<span class="home-pagination-dots">...</span>';
      }

      const isActive = pageItem === currentPage;

      return `
        <button
          type="button"
          class="home-pagination-btn${isActive ? ' is-active' : ''}"
          data-page="${pageItem}"
          aria-label="Go to page ${pageItem}"
          ${isActive ? 'aria-current="page" disabled' : ''}
        >
          ${pageItem}
        </button>
      `;
    })
    .join('');

  container.classList.remove('is-hidden');

  container.onclick = event => {
    const button = event.target.closest('[data-page]');

    if (!button) {
      return;
    }

    onPageChange(Number(button.dataset.page));
  };
}

function getVisiblePages(currentPage, totalPages) {
  if (totalPages <= VISIBLE_PAGES_COUNT) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = [1];

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  if (startPage > 2) {
    pages.push('dots');
  }

  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page);
  }

  if (endPage < totalPages - 1) {
    pages.push('dots');
  }

  pages.push(totalPages);

  return pages;
}
