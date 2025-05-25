const cart = {};
let cartPopup = null;
let cartCount = null;

const addToCartBtn = document.querySelector(".add-to-cart");
const cartIcon = document.querySelector("a[href='#'] i.fa-cart-shopping")?.parentElement;

// Tạo và thêm div thông báo "Đã thêm vào giỏ hàng"
let addedMsg = document.createElement("div");
addedMsg.id = "added-message";
document.body.appendChild(addedMsg);

if (addToCartBtn && cartIcon) {
  addToCartBtn.addEventListener("click", () => {
    const name = document.querySelector(".info-section h2")?.innerText.trim();
    const priceText = document.querySelector(".price")?.innerText.replace(/[^\d]/g, '');
    const price = parseInt(priceText);
    const imgSrc = document.querySelector(".main-image")?.src;

    if (!name || isNaN(price) || !imgSrc) return;

    if (cart[name]) {
      cart[name].quantity++;
    } else {
      cart[name] = { price, quantity: 1, img: imgSrc };
    }

    updateCartDisplay();

   
    // Hiện thông báo "Đã thêm vào giỏ hàng"
    addedMsg.classList.add("show");
    clearTimeout(addedMsg.timeout);
    addedMsg.timeout = setTimeout(() => {
      addedMsg.classList.remove("show");
    }, 3000);
  });

  cartIcon.addEventListener("click", (e) => {
    e.preventDefault();
    if (cartPopup) {
      const isVisible = cartPopup.style.display === "block";
      cartPopup.style.display = isVisible ? "none" : "block";

      if (!isVisible) {
        cartPopup.classList.add("cart-popup-dropdown");
        const rect = cartIcon.getBoundingClientRect();
        cartPopup.style.top = `${rect.bottom + window.scrollY + 10}px`;
        cartPopup.style.left = `${rect.left + window.scrollX}px`;
      }
    }
  });
}

function updateCartDisplay() {
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

  if (!cartCount) {
    cartCount = document.createElement("span");
    Object.assign(cartCount.style, {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      background: "red",
      color: "white",
      borderRadius: "50%",
      fontSize: "12px",
      padding: "2px 6px",
      zIndex: "1000",
    });
    cartCount.className = "cart-count";
    cartIcon.style.position = "relative";
    cartIcon.appendChild(cartCount);
  }
  cartCount.innerText = totalItems;

  // Tạo popup nếu chưa có
  if (!cartPopup) {
    cartPopup = document.createElement("div");
    cartPopup.id = "cart-popup";
    Object.assign(cartPopup.style, {
      position: "absolute",
      background: "white",
      border: "1px solid #ccc",
      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      padding: "10px",
      display: "none",
      width: "320px",
      maxHeight: "400px",
      overflowY: "auto",
      borderRadius: "10px",
      zIndex: "1000",
      fontFamily: "sans-serif",
    });
    document.body.appendChild(cartPopup);
  }

  // Thêm nút đóng ở đầu popup
  cartPopup.innerHTML = `<button class="close-btn" title="Đóng">Đóng</button>`;

  for (const [name, item] of Object.entries(cart)) {
    const itemDiv = document.createElement("div");
    Object.assign(itemDiv.style, {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "12px",
      
    });

    itemDiv.innerHTML = `
      <img src="${item.img}" style="width:60px;height:auto;border-radius:5px;margin-right:10px;">
      <div style="flex:1;">
        <div style="font-weight:bold;font-size:14px;">${name}</div>
        <div style="font-size:13px;">${item.price.toLocaleString()}₫ × ${item.quantity}</div>
      </div>
      <button style="
        background:red;
        color:white;
        border:none;
        padding:5px 8px;
        border-radius:5px;
        cursor:pointer;
        font-size:12px;
        margin-left:10px;
      " data-name="${name}">Xoá</button>
    `;
    cartPopup.appendChild(itemDiv);
  }

  // Gắn sự kiện nút xoá
  cartPopup.querySelectorAll("button[data-name]").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      delete cart[name];
      updateCartDisplay();
    });
  });

  // Gắn sự kiện nút đóng popup
  cartPopup.querySelector(".close-btn").addEventListener("click", () => {
    cartPopup.style.display = "none";
  });
}
 


