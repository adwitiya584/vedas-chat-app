// public/chat.js
const socket = io();

// Elements
const loginDiv = document.getElementById("login");
const loginBtn = document.getElementById("login-btn");
const usernameInput = document.getElementById("username-input");
const chatDiv = document.getElementById("chat-container");
const messagesEl = document.getElementById("messages");
const inputEl = document.getElementById("input");
const sendBtn = document.getElementById("send");

let username = "";

// 1) Dummy login
loginBtn.onclick = () => {
  const name = usernameInput.value.trim();
  if (!name) return alert("Enter your name");
  username = name;
  loginDiv.style.display = "none";
  chatDiv.style.display = "flex";
  inputEl.focus();
};

// 2) Receive & render messages
socket.on("message", (msg) => addMessage(msg));

function addMessage({ username: from, text, timestamp }) {
  const div = document.createElement("div");
  div.className = "msg";
  div.innerHTML = `
    <div><strong>${from}</strong> <span class="meta">${timestamp}</span></div>
    <div>${text}</div>
  `;
  messagesEl.append(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// 3) Send messages
function sendMessage() {
  const text = inputEl.value.trim();
  if (!text || !username) return;
  socket.emit("message", { username, text });
  inputEl.value = "";
}
sendBtn.onclick = sendMessage;
inputEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
