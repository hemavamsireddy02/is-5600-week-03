// Grab DOM elements
window.messages = document.getElementById('messages');
window.form = document.getElementById('form');
window.input = document.getElementById('input');

// Listen for messages from the server via SSE
new window.EventSource("/sse").onmessage = function(event) {
  const p = document.createElement('p');
  p.textContent = event.data;
  window.messages.appendChild(p);
  window.messages.scrollTop = window.messages.scrollHeight; // scroll to bottom
};

// Handle form submission
window.form.addEventListener('submit', function(event) {
  event.preventDefault();

  const message = window.input.value.trim();
  if (!message) return;

  // Send message to server
  fetch(`/chat?message=${encodeURIComponent(message)}`);
  window.input.value = '';
});