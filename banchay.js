const toggleBtn = document.getElementById("khung");
const filterBox = document.getElementById("boxtrong");

toggleBtn.addEventListener("click", () => {
  filterBox.classList.toggle("ẩn");
});

// Lọc và sắp xếp sản phẩm
const checkboxes = document.querySelectorAll(".danh-muc input[type='checkbox']");
const colorCheckboxes = document.querySelectorAll(".mau-sac input[type='checkbox']"); 
const sortSelect = document.querySelector(".sap-xep select");
const productList = document.querySelector(".product-list");
const products = Array.from(productList.children); 

function filterAndSortProducts() {
  const checkedCategories = Array.from(checkboxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  let filtered;

  if (checkedCategories.length === 0) {
    filtered = products; // Không chọn gì thì hiện hết
  } else {
    filtered = products.filter(product =>
      checkedCategories.includes(product.dataset.category)
    );
  }

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

checkboxes.forEach(cb => cb.addEventListener("change", filterAndSortProducts));
colorCheckboxes.forEach(cb => cb.addEventListener("change", filterAndSortProducts)); // ← Thêm dòng này
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



function toggleHeart(el) {
  el.classList.toggle('liked');
}

document.querySelectorAll('.heart-icon').forEach(function(icon) {
  icon.addEventListener('click', function () {
    this.classList.toggle('fa-regular'); // bỏ viền
    this.classList.toggle('fa-solid');   // thêm trái tim đậm
    this.classList.toggle('active');     // đổi sang đỏ
  });
});


// Tạo badge số lượng trên icon yêu thích (giả định icon là <i class="fa-solid fa-heart"> trong nav)
const nav = document.querySelector('nav');
const favoriteIcon = nav.querySelector('.fa-heart').parentElement;
const cartIcon = nav.querySelector('.fa-cart-shopping').parentElement;

// Tạo thẻ span hiển thị số lượng yêu thích
const favoriteCount = document.createElement('span');
favoriteCount.style.cssText = `
  position: absolute;
  top: -8px;
  right: -10px;
  background: red;
  color: white;
  font-size: 12px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  pointer-events: none;
`;
favoriteCount.textContent = '0';
favoriteIcon.style.position = 'relative';
favoriteIcon.appendChild(favoriteCount);

// Tạo popup yêu thích (ẩn ban đầu)
const favoriteBox = document.createElement('div');
favoriteBox.style.cssText = `
  display:none;
  position: fixed;
  top: 60px;
  right: 80px;
  width: 350px;
  max-height: 400px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 15px;
  border-radius: 10px;
  z-index: 9999;
`;
favoriteBox.innerHTML = `
  <h3>Danh sách yêu thích</h3>
  <ul id="favorite-items" style="list-style:none; padding-left: 0; margin-bottom:10px;"></ul>
  <button id="close-favorite" style="margin-top:10px; padding:6px 12px; cursor:pointer;">Đóng</button>
`;
document.body.appendChild(favoriteBox);

const favoriteItems = favoriteBox.querySelector('#favorite-items');
const closeFavoriteBtn = favoriteBox.querySelector('#close-favorite');

const favorites = {};

// Xử lý khi bấm icon trái tim trong mỗi sản phẩm
document.querySelectorAll(".product-card .fa-heart").forEach(icon => {
  icon.style.cursor = 'pointer';
  icon.addEventListener("click", () => {
    const product = icon.closest(".product-card");
    const name = product.querySelector("h2").innerText;
    const imgSrc = product.querySelector("img").src;

    if(favorites[name]) {
      delete favorites[name]; // Bỏ yêu thích nếu đã tồn tại
    } else {
      favorites[name] = { img: imgSrc };
    }
    updateFavorites();
  });
});

function updateFavorites() {
  favoriteItems.innerHTML = "";
  let total = 0;

  for (let name in favorites) {
    total++;

    const li = document.createElement("li");
    li.style.marginBottom = "12px";
    li.style.display = "flex";
    li.style.alignItems = "center";

    li.innerHTML = `
<img src="${favorites[name].img}" alt="${name}" style="width:50px; height:50px; border-radius:8px; margin-right:10px; object-fit:cover;">
      <div style="flex-grow:1;">
        <strong>${name}</strong>
      </div>
      <button data-name="${name}" style="background:#e76969; border:none; color:#fff; border-radius:5px; cursor:pointer; padding:4px 8px;">Xóa</button>
    `;
    favoriteItems.appendChild(li);

    // Xóa khỏi yêu thích
    li.querySelector("button").addEventListener("click", (e) => {
      const prodName = e.target.getAttribute("data-name");
      delete favorites[prodName];
      updateFavorites();
    });
  }

  favoriteCount.textContent = total;
}

// Mở/đóng popup yêu thích khi bấm icon ❤️
favoriteIcon.addEventListener("click", (e) => {
  e.preventDefault();
  favoriteBox.style.display = (favoriteBox.style.display === "block") ? "none" : "block";
});

// Bấm nút đóng
closeFavoriteBtn.addEventListener("click", () => {
  favoriteBox.style.display = "none";
});

// Tạo thẻ span hiển thị số lượng
const cartCount = document.createElement('span');
cartCount.style.cssText = `
  position: absolute;
  top: -8px;
  right: -10px;
  background: red;
  color: white;
  font-size: 12px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  pointer-events: none;
`;
cartCount.textContent = '0';
cartIcon.style.position = 'relative';
cartIcon.appendChild(cartCount);

// Tạo popup giỏ hàng ẩn ban đầu
const cartBox = document.createElement('div');
cartBox.style.cssText = `
  display:none; 
  position: fixed; 
  top: 60px; 
  right: 20px; 
  width: 350px; 
  max-height: 400px; 
  overflow-y: auto; 
  background: white; 
  border: 1px solid #ddd; 
  box-shadow: 0 4px 12px rgba(0,0,0,0.15); 
  padding: 15px; 
  border-radius: 10px;
  z-index: 9999;
`;
cartBox.innerHTML = `
  <h3>Giỏ hàng của bạn</h3>
  <ul id="cart-items" style="list-style:none; padding-left: 0; margin-bottom:10px;"></ul>
  <button id="close-cart" style="margin-top:10px; padding:6px 12px; cursor:pointer;">Đóng</button>
`;
document.body.appendChild(cartBox);

const cartItems = cartBox.querySelector('#cart-items');
const closeCartBtn = cartBox.querySelector('#close-cart');

const cart = {};

// Bấm nút "Thêm vào giỏ"
document.querySelectorAll(".product-card button").forEach(btn => {
  btn.addEventListener("click", () => {
    const product = btn.closest(".product-card");
    const name = product.querySelector("h2").innerText;
    const priceText = product.querySelector("p").innerText.replace(/[^\d]/g, '');
    const price = parseInt(priceText);
    const imgSrc = product.querySelector("img").src;

    if(cart[name]) {
      cart[name].quantity++;
    } else {
      cart[name] = { price, quantity: 1, img: imgSrc };
    }
    updateCart();
  });
});

function updateCart() {
  let totalQuantity = 0;
  cartItems.innerHTML = "";
for (let name in cart) {
    const item = cart[name];
    totalQuantity += item.quantity;

    const li = document.createElement("li");
    li.style.marginBottom = "12px";
    li.style.display = "flex";
    li.style.alignItems = "center";

    li.innerHTML = `
      <img src="${item.img}" alt="${name}" style="width:50px; height:50px; border-radius:8px; margin-right:10px; object-fit:cover;">
      <div style="flex-grow:1;">
        <strong>${name}</strong><br>
        ${item.quantity} x ${item.price.toLocaleString()} ₫
      </div>
      <button data-name="${name}" style="background:#e76969; border:none; color:#fff; border-radius:5px; cursor:pointer; padding:4px 8px;">Xóa</button>
    `;
    cartItems.appendChild(li);

    // Nút xóa sản phẩm
    li.querySelector("button").addEventListener("click", (e) => {
      const prodName = e.target.getAttribute("data-name");
      delete cart[prodName];
      updateCart();
    });
  }

  cartCount.textContent = totalQuantity;
}

// Bấm vào icon giỏ hàng mở/đóng popup
cartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  cartBox.style.display = (cartBox.style.display === "block") ? "none" : "block";
});

// Bấm đóng popup
closeCartBtn.addEventListener("click", () => {
  cartBox.style.display = "none";
});