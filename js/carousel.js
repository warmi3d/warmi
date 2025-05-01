
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.carousel img');
  let current = 0;

  function showImage(index) {
    images.forEach((img, i) => {
      img.style.display = i === index ? 'block' : 'none';
    });
  }

  function nextImage() {
    current = (current + 1) % images.length;
    showImage(current);
  }

  function prevImage() {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  }

  document.getElementById('nextBtn').addEventListener('click', nextImage);
  document.getElementById('prevBtn').addEventListener('click', prevImage);

  images.forEach(img => {
    img.addEventListener('click', () => {
      const modal = document.getElementById('lightbox');
      const modalImg = document.getElementById('lightbox-img');
      modal.style.display = 'block';
      modalImg.src = img.src;
    });
  });

  document.getElementById('lightbox').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
  });

  showImage(current);
});
