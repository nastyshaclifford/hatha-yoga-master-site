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

  //открыто ли модальное окно?
  const modalOpen = () => document.body.classList.contains("modal-open");

  class Carousel {
    constructor(container, itemsContainer, items, nav) {
      this.carouselContainer = container;
      this.carouselItemsContainer = itemsContainer;
      this.carouselArray = [...items]; //преобразование в массив
      this.navItems = [...nav];
      this.currentIndex = 2;
      this.isAnimating = false; //убираем конфликты ("наложение" анимаций)

      //обработчик и отрисовка слайдера
      this.setupEventListeners();
      this.updateSlider();
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

  new Carousel(sliderContainer, sliderItemsContainer, sliderItems, navItems);

  // Создаем модальное окно для увеличенного изображения
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.innerHTML = `
    <div class="image-modal__content">
      <span class="image-modal__close">&times;</span>
      <img class="image-modal__img" src="" alt="Увеличенное изображение">
    </div>
  `;
  document.body.appendChild(modal);

  // Добавляем стили для модального окна
  const style = document.createElement('style');
  style.textContent = `
    .image-modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      overflow: auto;
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    .image-modal.show {
      display: block;
      opacity: 1;
    }
    
    .image-modal__content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      position: relative;
    }
    
    .image-modal__img {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
    }
    
    .image-modal__close {
      position: absolute;
      top: 20px;
      right: 30px;
      color: white;
      font-size: 35px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s;
    }
    
    .image-modal__close:hover {
      color: #ccc;
    }
    
    body.modal-open {
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);

  //открытие модального окна
  function openModal(imgSrc) {
    const modalImg = modal.querySelector('.image-modal__img');
    modalImg.src = imgSrc;
    modal.classList.add('show');
    document.body.classList.add('modal-open');
  }

  // закрытие модального окна
  function closeModal() {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
  }

  //4.обработчик 
  // клики по изображению
  document.querySelectorAll('.section-reviews__slider-img').forEach(img => {
    img.addEventListener('click', function (e) {
      //является ли клик частью переключения слайдов
      if (!e.target.closest('.section-reviews__slider-item').classList.contains('item-3')) {
        return;
      }

      // открытие только для центрального слайда
      if (document.body.classList.contains('modal-open')) {
        closeModal();
      } else {
        openModal(this.src);
      }
      e.stopPropagation();
    });
  });

  // Закрытие модального окна
  modal.querySelector('.image-modal__close').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });
});