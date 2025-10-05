document.addEventListener('DOMContentLoaded', () => {
  // ===== Gallery / Lightbox logic =====
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-image');
  const lightboxTitle = document.querySelector('.lightbox-title');
  const lightboxLocation = document.querySelector('.lightbox-location');
  const overlay = document.querySelector('.lightbox-overlay');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-arrow.left');
  const nextBtn = document.querySelector('.lightbox-arrow.right');

  let currentIndex = 0;
  let images = [];


  // Fade-in for gallery cards
  galleryItems.forEach((item, i) => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      item.style.opacity = 1;
      item.style.transform = 'translateY(0)';
    }, i * 150);
  });

  // Open Lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const title = item.dataset.title;
      const location = item.dataset.location;
      const imgs = Array.from(item.querySelectorAll('.image-placeholders img')).map(img => img.src);
      if (!imgs.length) return;

      images = imgs;
      currentIndex = 0;

      lightboxTitle.textContent = title;
      lightboxLocation.textContent = location;
      lightboxImg.src = images[currentIndex];

      lightbox.classList.remove('fade-out');
      lightbox.classList.add('show');

      overlay.style.background = 'rgba(255,255,255,0)';
      requestAnimationFrame(() => {
        overlay.style.transition = 'background 0.8s ease';
        overlay.style.background = 'rgba(255,255,255,0.85)';
      });
    });
  });

  // Close Lightbox (with fade-out)
  function closeLightbox() {
    lightbox.classList.add('fade-out');
    overlay.style.background = 'rgba(255,255,255,0)';
    setTimeout(() => {
      lightbox.classList.remove('show', 'fade-out');
    }, 400); // match CSS transition duration
  }

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', closeLightbox);

  // Smooth fade transition between images
  function changeImage(newIndex) {
    lightboxImg.classList.add('fade-out');
    setTimeout(() => {
      currentIndex = (newIndex + images.length) % images.length;
      lightboxImg.src = images[currentIndex];
      lightboxImg.onload = () => lightboxImg.classList.remove('fade-out');
    }, 300);
  }

  nextBtn.addEventListener('click', () => changeImage(currentIndex + 1));
  prevBtn.addEventListener('click', () => changeImage(currentIndex - 1));

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('show')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
  });
});
