const toggleBtn = document.getElementById("khung");
const filterBox = document.getElementById("boxtrong");

toggleBtn.addEventListener("click", () => {
  filterBox.classList.toggle("ẩn");
});
// Lọc và sắp xếp sản phẩm
const colorCheckboxes = document.querySelectorAll(".mau-sac input[type='checkbox']"); 
const sortSelect = document.querySelector(".sap-xep select");
const productList = document.querySelector(".product-list");
const products = Array.from(productList.children); 

function filterAndSortProducts() {
  let filtered = products;

  const checkedColors = Array.from(colorCheckboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  if (checkedColors.length > 0) {
    filtered = filtered.filter(product =>
      checkedColors.includes(product.dataset.color)
    );
  }

  const sortValue = sortSelect.value;

  if (sortValue === "price-asc") {
    filtered.sort((a, b) => +a.dataset.price - +b.dataset.price);
  } else if (sortValue === "price-desc") {
    filtered.sort((a, b) => +b.dataset.price - +a.dataset.price);
  }

  // Hiển thị lại sản phẩm
  productList.innerHTML = "";
  filtered.forEach(product => productList.appendChild(product));
}

colorCheckboxes.forEach(cb => cb.addEventListener("change", filterAndSortProducts));
sortSelect.addEventListener("change", filterAndSortProducts);

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