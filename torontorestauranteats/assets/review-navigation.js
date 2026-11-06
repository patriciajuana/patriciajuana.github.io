(() => {
  const inlineMenu = document.querySelector('.tre-review-contents-inline');
  const sidebarMenu = document.querySelector('.tre-review-sidebar .tre-review-contents');
  const mobileMenu = document.querySelector('.tre-mobile-review-nav');
  function update() {
    const passedInline = inlineMenu.getBoundingClientRect().bottom <= 0;
    sidebarMenu.hidden = !passedInline;
    mobileMenu.hidden = !passedInline;
    if (!passedInline) mobileMenu.open = false;
  }
  const observer = new IntersectionObserver(update, { threshold: [0, 1] });
  observer.observe(inlineMenu);
  window.addEventListener('resize', update);
  window.addEventListener('scroll', update, { passive: true });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { mobileMenu.open = false; });
  });
  update();
})();
