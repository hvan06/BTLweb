function switchForm(formId) {
      document.querySelectorAll('.form-box').forEach(form => {
        form.classList.remove('active');
      });
      document.getElementById(formId).classList.add('active');
    }
  
    function togglePassword(inputId, icon) {
      const input = document.getElementById(inputId);
      if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("bx-show", "bx-hide");
      } else {
        input.type = "password";
        icon.classList.replace("bx-hide", "bx-show");
      }
    }
  
    // Xử lý đăng ký: lưu thông tin vào localStorage
    document.getElementById('registerForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const username = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const password = document.getElementById('registerPassword').value;
  
      const userData = { username, email, password };
      localStorage.setItem('user', JSON.stringify(userData));
  
      alert("Bạn đã đăng ký thành công!");
      switchForm('loginForm');
    });
  
    // Xử lý đăng nhập: so sánh với localStorage
    document.getElementById('loginForm').addEventListener('submit', function(e) {
      e.preventDefault();
  
      const username = this.querySelector('input[type="text"]').value;
      const password = document.getElementById('loginPassword').value;
      const savedUser = JSON.parse(localStorage.getItem('user'));
  
      if (savedUser && username === savedUser.username && password === savedUser.password) {
  alert("Đăng nhập thành công!");
  // Lưu thông tin đăng nhập vào localStorage
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('username', username);
  window.location.href = "trangchu.html"; // chuyển sang trang chủ
} else {
  alert("Bạn đã nhập sai mật khẩu hoặc tên đăng nhập!");
}

    });