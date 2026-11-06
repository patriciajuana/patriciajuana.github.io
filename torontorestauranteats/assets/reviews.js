(() => {
  const grid = document.querySelector('.tre-reviews-grid');
  const cards = [...grid.querySelectorAll('.tre-review-card')].sort((a, b) =>
    b.querySelector('time').dateTime.localeCompare(a.querySelector('time').dateTime));
  cards.forEach(card => grid.append(card));
  const params = new URLSearchParams(location.search);
  const filterLinks = [...document.querySelectorAll('.tre-review-filters a')];
  const tag = params.get('tag') || '';
  const selected = filterLinks.find(link => link.dataset.tag === tag);
  if (selected) selected.setAttribute('aria-current', 'true');
  const matches = cards.filter(card => !tag || card.dataset.tags.split(' ').includes(tag));
  const perPage = 6;
  const pages = Math.ceil(matches.length / perPage);
  const requested = Number(params.get('page'));
  const page = Number.isInteger(requested) ? Math.max(1, Math.min(pages || 1, requested)) : 1;
  const start = (page - 1) * perPage;
  const visible = matches.slice(start, start + perPage);
  cards.forEach(card => { card.hidden = !visible.includes(card); });
  if (page === 1 && visible.length) {
    grid.classList.add('has-latest-review');
    visible[0].classList.add('is-latest-review');
    const label = document.createElement('p');
    label.className = 'tre-latest-label';
    label.textContent = 'Latest review';
    visible[0].querySelector('.tre-card-copy').prepend(label);
  }
  document.querySelector('.tre-filter-status').textContent = tag ? (selected ? selected.textContent : 'No matching category') : '';
  document.querySelector('.tre-reviews-list-head>span').textContent = matches.length
    ? `${start + 1}–${Math.min(start + perPage, matches.length)} of ${matches.length} restaurant features`
    : '0 restaurant features';
  document.querySelector('.tre-no-reviews').hidden = matches.length > 0;
  const pager = document.querySelector('.tre-pagination');
  pager.hidden = matches.length === 0;
  function addLink(text, target, label, disabled = false) {
    const element = document.createElement(disabled ? 'span' : 'a');
    element.textContent = text;
    element.setAttribute('aria-label', label);
    if (disabled) element.setAttribute('aria-disabled', 'true');
    else {
      const query = new URLSearchParams();
      if (tag) query.set('tag', tag);
      query.set('page', target);
      element.href = `reviews.html?${query}#restaurant-reviews`;
      if (target === page) element.setAttribute('aria-current', 'page');
    }
    pager.append(element);
  }
  if (pages > 0) {
    addLink('← Previous', page - 1, 'Previous page', page === 1);
    for (let number = 1; number <= pages; number++) addLink(String(number), number, `Page ${number}`);
    addLink('Next →', page + 1, 'Next page', page === pages);
  }
})();
