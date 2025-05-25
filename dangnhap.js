 document.addEventListener('DOMContentLoaded', () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const username = localStorage.getItem('username') || 'Khách hàng';
  
      const loginBtn = document.getElementById('login-btn');
      const logoutBtn = document.getElementById('logout-btn');
      const userStatus = document.getElementById('user-status');
  
      if (isLoggedIn) {
  if (userStatus) userStatus.textContent = username;
  if (loginBtn) loginBtn.style.display = 'none';
  if (logoutBtn) logoutBtn.style.display = 'inline-block';
} else {
  if (userStatus) userStatus.textContent = 'Khách hàng'; // Hiện chữ này khi chưa đăng nhập
  if (loginBtn) loginBtn.style.display = 'inline-block';
  if (logoutBtn) logoutBtn.style.display = 'none';
}

  
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('username');
          location.reload();
        });
      }
    });