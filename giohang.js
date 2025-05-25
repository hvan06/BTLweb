// Tạo badge số lượng trên icon giỏ hàng (giả định icon giỏ hàng là <i class="fa-solid fa-cart-shopping"> trong nav)
const nav = document.querySelector('nav');
const cartIcon = nav.querySelector('.fa-cart-shopping').parentElement;

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