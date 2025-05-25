    const mainImage = document.querySelector(".main-image");
    const thumbnails = document.querySelectorAll(".thumbnail");

    thumbnails.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        mainImage.src = thumb.src;
        thumbnails.forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
      });
    });
    // Toggle khung chat
function toggleChat() {
const chatBox = document.getElementById("chatBox");
chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";
}

// Gửi tin nhắn
function sendMessage() {
const input = document.getElementById("chatInput");
const message = input.value.trim();
if (message === "") return;

const messages = document.getElementById("chatMessages");

// Thêm tin nhắn người dùng
const userMsg = document.createElement("div");
userMsg.className = "user";
userMsg.textContent = message;
messages.appendChild(userMsg);

// Giả lập trả lời sau 1 giây
setTimeout(() => {
  const botMsg = document.createElement("div");
  botMsg.className = "bot";
  botMsg.textContent = "Cảm ơn bạn! Mình sẽ phản hồi sớm.";
  messages.appendChild(botMsg);
  messages.scrollTop = messages.scrollHeight;
}, 1000);

// Clear input
input.value = "";
messages.scrollTop = messages.scrollHeight;
}