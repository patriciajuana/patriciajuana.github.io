(() => {
  const category = new URLSearchParams(location.search).get('category') || '';
  document.querySelectorAll('.tre-journal-filters a').forEach(link => {
    if (link.dataset.category === category) link.setAttribute('aria-current', 'true');
  });
  document.querySelectorAll('.tre-journal-card').forEach(card => {
    card.hidden = Boolean(category && card.dataset.category !== category);
  });
})();
