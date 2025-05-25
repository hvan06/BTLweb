
  // Bắt sự kiện khi người dùng nhập vào ô tìm kiếm
  document.getElementById('searchInput').addEventListener('input', function () {
    const keyword = this.value.toLowerCase(); // Lấy từ khóa người dùng nhập
    const products = document.querySelectorAll('.product-card'); // Lấy danh sách sản phẩm

    products.forEach(product => {
      const name = product.querySelector('h2').innerText.toLowerCase(); // Lấy tên sản phẩm
      if (name.includes(keyword)) {
        product.style.display = 'block'; // Hiện sản phẩm nếu khớp
      } else {
        product.style.display = 'none'; // Ẩn nếu không khớp
      }
    });
  });


// cái nào dùng cnay ph cho id searchInput 