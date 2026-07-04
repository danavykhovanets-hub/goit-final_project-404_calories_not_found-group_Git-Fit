export function initScrollFade(wrapperSelector, textSelector) {
  const wrapper = document.querySelector(wrapperSelector);
  const text = document.querySelector(textSelector);

  if (!wrapper || !text) {
    return;
  }

  const updateFade = () => {
    const isAtBottom =
      text.scrollHeight - text.scrollTop - text.clientHeight <= 1;

    wrapper.classList.toggle('scroll-fade-hidden', isAtBottom);;
  };

  updateFade();

  text.addEventListener('scroll', updateFade, { passive: true });
  window.addEventListener('resize', updateFade);
}
