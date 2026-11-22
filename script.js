const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const ctaForm = document.getElementById('ctaForm');
const emailInput = document.getElementById('emailInput');
const formFeedback = document.getElementById('formFeedback');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Handle CTA form submission cleanly
ctaForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (email) {
    formFeedback.textContent = `✓ Invite sent to ${email}! Check your inbox.`;
    emailInput.value = '';
  }
});