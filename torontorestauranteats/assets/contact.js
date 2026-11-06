(() => {
  const form = document.querySelector('.tre-message-form');
  const params = new URLSearchParams(window.location.search);
  function markFilled(field) {
    const mark = document.createElement('span');
    mark.className = 'tre-prefilled';
    mark.textContent = '✓ Filled from homepage';
    field.after(mark);
    field.classList.add('is-prefilled');
    field.addEventListener('input', () => {
      mark.remove();
      field.classList.remove('is-prefilled');
    }, { once: true });
  }

  // Continue a homepage inquiry without making visitors re-enter their details.
  for (const name of ['restaurant', 'email']) {
    const value = params.get(name);
    if (value) {
      const field = form.elements.namedItem(name);
      field.value = value;
      markFilled(field);
    }
  }

  const topic = form.elements.namedItem('topic');
  const selectedTopic = params.get('topic');
  if ([...topic.options].some(option => option.value === selectedTopic)) {
    topic.value = selectedTopic;
    markFilled(topic);
  }
})();
