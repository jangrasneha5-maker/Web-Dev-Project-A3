const contactForm = document.getElementById('contact-form');
const contactSubmit = contactForm.querySelector('button[type="submit"]');
const contactStatus = document.getElementById('contact-status');
const messageField = contactForm.elements.message;
const characterCount = document.getElementById('message-count');

function updateMessageCount() {
  characterCount.textContent = `${messageField.value.length} / ${messageField.maxLength} characters (minimum 10)`;
}

messageField.addEventListener('input', updateMessageCount);
updateMessageCount();

contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (contactSubmit.disabled) return;

  const { name, email, topic, message } = contactForm.elements;
  const data = {
    name: name.value.trim(),
    email: email.value.trim(),
    topic: topic.value,
    message: message.value.trim()
  };

  if (data.name.length < 2) {
    contactStatus.textContent = 'Enter at least 2 characters for your name.';
    name.focus();
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    contactStatus.textContent = 'Enter a valid email address.';
    email.focus();
    return;
  }
  if (data.message.length < 10 || data.message.length > 500) {
    contactStatus.textContent = 'Enter a message between 10 and 500 characters.';
    message.focus();
    return;
  }

  contactSubmit.disabled = true;
  contactStatus.textContent = 'Sending your message…';
  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (response.status === 201) {
      window.location.assign('/thank-you.html');
      return;
    }
    const result = await response.json().catch(() => ({}));
    contactStatus.textContent = result.message || 'Could not save your message. Please try again.';
  } catch {
    contactStatus.textContent = 'Could not reach the server. Please check your connection and try again.';
  }
  contactSubmit.disabled = false;
});

window.addEventListener('pageshow', event => {
  if (event.persisted) {
    contactSubmit.disabled = false;
    contactStatus.textContent = '';
    updateMessageCount();
  }
});
