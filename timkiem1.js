function searchProduct() {
    var keyword = document.getElementById("searchInput").value.toLowerCase();

    // Danh sách từ khóa và trang tương ứng
    const searchMap = {
        "áo phông": "aothun.html",
        "áo sơ mi": "aosomi.html",
        "áo hoodie": "aohoodie.html",
        "quần dài": "quandai.html",
        "quần short": "quanshort.html",
        "mũ": "mu.html",
        "tất": "tat.html",
        "túi": "tui.html",
        "áo thun": "aothun.html",

    };

    // Tìm từ khóa phù hợp
    for (const key in searchMap) {
        if (keyword.includes(key)) {
            window.location.href = searchMap[key];
            return false;
        }
    }

    alert("Không tìm thấy sản phẩm phù hợp.");
    return false;
}