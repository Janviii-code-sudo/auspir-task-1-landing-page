const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const ctaForm = document.getElementById('ctaForm');
const emailInput = document.getElementById('emailInput');
const formFeedback = document.getElementById('formFeedback');

hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

ctaForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  formFeedback.style.color = '#94a3b8';
  formFeedback.textContent = 'Submitting...';

  try {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const result = await res.json();

    if (res.ok) {
      formFeedback.style.color = '#34d399';
      formFeedback.textContent = result.message;
      emailInput.value = '';
    } else {
      formFeedback.style.color = '#f87171';
      formFeedback.textContent = result.message;
    }
  } catch {
    formFeedback.style.color = '#f87171';
    formFeedback.textContent = 'Server offline. Run "node server.js" in terminal.';
  }
});