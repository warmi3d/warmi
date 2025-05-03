document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const items = Array.from(document.querySelectorAll('.product'));
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');

  const visibleItems = 4;
  let currentIndex = visibleItems;

  // 1. Klonujemy ostatnie i pierwsze elementy
  const clonesBefore = items.slice(-visibleItems).map(item => item.cloneNode(true));
  const clonesAfter = items.slice(0, visibleItems).map(item => item.cloneNode(true));

  clonesBefore.forEach(clone => track.prepend(clone));
  clonesAfter.forEach(clone => track.append(clone));

  const allItems = Array.from(document.querySelectorAll('.product'));
  const itemWidth = () => allItems[0].getBoundingClientRect().width;

  function updateCarousel(animate = true) {
    if (!animate) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.4s ease-in-out';
    }
    track.style.transform = `translateX(-${currentIndex * itemWidth()}px)`;
  }

  nextButton.addEventListener('click', () => {
    if (currentIndex >= allItems.length - visibleItems) return;
    currentIndex++;
    updateCarousel();

    // Jeśli jesteśmy na końcu, przeskocz do prawdziwego 1
    setTimeout(() => {
      if (currentIndex === allItems.length - visibleItems) {
        currentIndex = visibleItems;
        updateCarousel(false);
      }
    }, 400);
  });

  prevButton.addEventListener('click', () => {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateCarousel();

    // Jeśli jesteśmy na początku, przeskocz do prawdziwego końca
    setTimeout(() => {
      if (currentIndex === 0) {
        currentIndex = allItems.length - (2 * visibleItems);
        updateCarousel(false);
      }
    }, 400);
  });

  window.addEventListener('resize', () => updateCarousel(false));
  window.addEventListener('load', () => updateCarousel(false));
});