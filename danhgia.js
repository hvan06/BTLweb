const form = document.getElementById('reviewForm');
  const preview = document.getElementById('previewImages');
  const submitted = document.getElementById('submittedReview');

  document.getElementById('imageUpload').addEventListener('change', function () {
    preview.innerHTML = "";
    [...this.files].forEach(file => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement('img');
        img.src = e.target.result;
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });

  form.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const star = document.querySelector('input[name="star"]:checked')?.value || 0;
  const comment = document.getElementById('comment').value;

  const previewClone = preview.cloneNode(true);

  const review = document.createElement('div');
  review.classList.add('review-item');
  review.innerHTML = `
    <h3>Đánh giá mới:</h3>
    <p><strong>Số sao:</strong> ${'★'.repeat(star)}${'☆'.repeat(5 - star)}</p>
    <p><strong>Nội dung:</strong> ${comment}</p>
  `;
  review.appendChild(previewClone);

  submitted.appendChild(review);

  form.reset();
  preview.innerHTML = "";
});