async function requestRecord(url, method = 'GET', data) {
  const options = { method };
  if (data) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(data);
  }
  const response = await fetch(url, options);
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || 'The request could not be completed.');
  return result;
}

for (const panel of document.querySelectorAll('[data-endpoint]')) {
  const endpoint = '/api/' + panel.dataset.endpoint;
  const feedback = panel.querySelector('[role="status"]');
  const form = panel.querySelector('form');
  const fields = form?.querySelector('fieldset');
  const save = form?.querySelector('[type="submit"]');
  const cancel = form?.querySelector('[type="reset"]');
  let editingId = null;
  let originalDate;
  let busy = false;

  async function run(action, progress) {
    if (busy) return;
    busy = true;
    const buttons = panel.querySelectorAll('button[data-action]');
    buttons.forEach(button => { button.disabled = true; });
    if (fields) fields.disabled = true;
    feedback.textContent = progress;
    try {
      await action();
    } catch (error) {
      feedback.textContent = error instanceof TypeError
        ? 'Could not reach the server. Please try again.'
        : error.message;
    } finally {
      if (fields) fields.disabled = false;
      buttons.forEach(button => { button.disabled = false; });
      busy = false;
    }
  }

  if (form) {
    const label = form.dataset.label;
    form.addEventListener('reset', () => {
      editingId = null;
      originalDate = undefined;
      save.textContent = 'Add ' + label;
      cancel.hidden = true;
      feedback.textContent = '';
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      if ('releaseYear' in data) data.releaseYear = Number(data.releaseYear);
      if (originalDate && data.date === originalDate.slice(0, 10)) data.date = originalDate;
      const url = editingId ? endpoint + '/' + editingId : endpoint;
      run(async () => {
        await requestRecord(url, editingId ? 'PUT' : 'POST', data);
        window.location.reload();
      }, 'Saving…');
    });
  }

  panel.addEventListener('click', event => {
    const button = event.target.closest('button[data-action]');
    if (!button || busy) return;
    const url = endpoint + '/' + button.dataset.id;
    if (button.dataset.action === 'delete') {
      if (!window.confirm('Delete this record?')) return;
      run(async () => {
        await requestRecord(url, 'DELETE');
        window.location.reload();
      }, 'Deleting…');
      return;
    }

    run(async () => {
      const record = await requestRecord(url);
      originalDate = record.date;
      for (const input of form.querySelectorAll('[name]')) {
        const value = record[input.name] ?? '';
        input.value = input.type === 'date' ? value.slice(0, 10) : value;
      }
      editingId = button.dataset.id;
      save.textContent = 'Save changes';
      cancel.hidden = false;
      feedback.textContent = 'Editing ' + form.dataset.label + '.';
      form.scrollIntoView({ block: 'nearest' });
    }, 'Loading record…').then(() => {
      if (editingId === button.dataset.id) form.querySelector('[name]').focus();
    });
  });
}
