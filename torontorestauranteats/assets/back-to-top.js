(() => {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'tre-back-to-top';
  button.innerHTML = '<span aria-hidden="true">↑</span>';
  button.setAttribute('aria-label', 'Back to top');
  button.title = 'Back to top';
  button.hidden = true;
  document.getElementById('tre-home').append(button);

  let wasAtTop = window.scrollY <= 400;
  function update() {
    const atTop = window.scrollY <= 400;
    // Keep keyboard focus available until scrolling back finishes.
    if (atTop && !wasAtTop && document.activeElement === button) {
      const heading = document.querySelector('main h1');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
        heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
      }
    }
    button.hidden = atTop;
    wasAtTop = atTop;
  }
  button.addEventListener('click', () => window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
  }));
  window.addEventListener('scroll', update, { passive: true });
  update();
})();
