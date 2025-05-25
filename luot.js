 const scrollContainer = document.querySelector('.product-list');
    const scrollLeftBtn = document.querySelector('.scroll-left');
    const scrollRightBtn = document.querySelector('.scroll-right');

    scrollLeftBtn.addEventListener('click', () => {
      scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', () => {
      scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });