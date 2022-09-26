const socket = io();

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Join chatroom
socket.emit('joinRoom', {
  username, room,
});

socket.on('message', (message) => {
  outputMessage(message);

  // Scroll to the bottom after the message is sent
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message send
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit('chatMessage', msg);

  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

function outputMessage(obj) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${obj.userName} <span>${obj.time}</span></p>
  <p class="text">
    ${obj.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}
