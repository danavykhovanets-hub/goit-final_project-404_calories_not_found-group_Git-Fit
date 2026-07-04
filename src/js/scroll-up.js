export function initScrollUp() {
  const scrollUpBtn = document.querySelector('[data-scroll-up]');
  const footer = document.querySelector('.site-footer');

  if (!scrollUpBtn) return;

  const updateScrollUpBtn = () => {
    scrollUpBtn.classList.toggle('is-visible', window.scrollY > 300);

    if (!footer) return;

    const buttonRect = scrollUpBtn.getBoundingClientRect();
    const footerRect = footer.getBoundingClientRect();
    const isOnFooter =
      buttonRect.bottom > footerRect.top &&
      buttonRect.top < footerRect.bottom;

    scrollUpBtn.classList.toggle('is-on-footer', isOnFooter);
  };

  scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  updateScrollUpBtn();
  window.addEventListener('scroll', updateScrollUpBtn, { passive: true });
  window.addEventListener('resize', updateScrollUpBtn);
}
