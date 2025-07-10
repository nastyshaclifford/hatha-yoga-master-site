// Определение элементов слайдера после загрузки DOM: контейнер слайдера, для слайдов и для слайдов, ну, и точки
document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".section-reviews__wrapper");
  const sliderItemsContainer = document.querySelector(
    ".section-reviews__slider-items"
  );
  const sliderItems = document.querySelectorAll(
    ".section-reviews__slider-item"
  );
  const navItems = document.querySelectorAll(".section-reviews__nav-item");
  const sliderImages = document.querySelectorAll(".section-reviews__slider-img");

  // предзагрузка
  function preloadImages() {
    return Promise.all(
      Array.from(sliderImages).map(img => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.src = img.src;
          image.onload = () => {
            img.classList.add('loaded');
            resolve();
          };
          image.onerror = reject;
        });
      })
    );
  }

  //открыто ли модальное окно?
  const modalOpen = () => document.body.classList.contains("modal-open");

  class Carousel {
    constructor(container, itemsContainer, items, nav) {
      this.carouselContainer = container;
      this.carouselItemsContainer = itemsContainer;
      this.carouselArray = [...items]; //преобразование в массив
      this.navItems = [...nav];
      this.currentIndex = 2;
      this.isAnimating = false;

      // Инициализация слайдера после предзагрузки изображений
      preloadImages().then(() => {
        this.setupEventListeners();
        this.updateSlider();
        this.carouselContainer.style.opacity = '1'; // Показываем слайдер после загрузки
      }).catch(error => {
        console.error('Error preloading images:', error);
        this.setupEventListeners();
        this.updateSlider();
      });

      /*       //обработчик и отрисовка слайдера
            this.setupEventListeners();
            this.updateSlider(); */
    }

    updateSlider() {
      if (this.isAnimating) return;
      this.isAnimating = true;

      //обновляем активную точку в меню
      this.navItems.forEach((item) => item.classList.remove("active"));
      //меняем индекс слайда
      const navIndex = (this.currentIndex + 2) % this.carouselArray.length;
      this.navItems[navIndex].classList.add("active");

      // удаляем/обновляем классы слайдов
      this.carouselArray.forEach((el) => {
        el.classList.remove(
          "item-0",
          "item-1",
          "item-2",
          "item-3",
          "item-4",
          "item-5",
          "item-6"
        );
        el.classList.add('transitioning');
      });

      //новые классы для слайдов
      this.carouselArray.forEach((el, i) => {
        const pos =
          (i - this.currentIndex + this.carouselArray.length) %
          this.carouselArray.length; //рассчитываем положение слайда относительно центрального
        el.classList.add(`item-${pos}`);
      });

      setTimeout(() => {
        this.isAnimating = false;
      }, 300);

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / this.animationDuration;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.carouselArray.forEach(el => {
            el.classList.remove('transitioning');
          });
          this.isAnimating = false;
        }
      };

      requestAnimationFrame(animate);
    }

    // 1. обработчик
    // навигация слайдера в виде точек
    setNavControls() {
      this.navItems.forEach((item, index) => {
        item.addEventListener("click", (e) => {
          if (modalOpen()) {
            e.stopPropagation();
            return;
          }

          this.currentIndex =
            (index - 2 + this.carouselArray.length) % this.carouselArray.length; //вычисляем индекс и обновляем слайдер
          this.updateSlider();
        });
      });
    }

    // 2. обработчик
    // прокрутка слайдов мышкой
    setupEventListeners() {
      this.carouselContainer.addEventListener("wheel", (e) => {
        if (this.isAnimating || modalOpen()) {
          e.preventDefault();
          return;
        }

        e.preventDefault();
        if (e.deltaY > 0) {
          this.currentIndex =
            (this.currentIndex + 1) % this.carouselArray.length;
        } else {
          this.currentIndex =
            (this.currentIndex - 1 + this.carouselArray.length) %
            this.carouselArray.length;
        }
        this.updateSlider();
      });

      // 3. обработчик
      // прокрутка слайдов по  клику на слайд (после чего слайд становится по центру)
      this.carouselArray.forEach((item) => {
        item.addEventListener("click", (e) => {
          if (modalOpen()) {
            e.stopPropagation();
            return;
          }
          const index = parseInt(item.getAttribute("data-index"));
          this.currentIndex =
            (index - 2 + this.carouselArray.length) % this.carouselArray.length;
          this.updateSlider();
        });
      });

      this.setNavControls();
    }
  }

  //слайдер загрузится после загрузки контента
  setTimeout(() => {
    new Carousel(sliderContainer, sliderItemsContainer, sliderItems, navItems);
  }, 0);
});