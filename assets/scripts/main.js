document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.nav__burger');
    const menu = document.querySelector('.nav__menu');

    burger.addEventListener('click', () => {
        menu.classList.toggle('show');
    });
});

//================== НАЧАЛО Логика слайдера ====================//

// Определение элементов слайдера после загрузки DOM: контейнер слайдера, для слайдов и для слайдов, ну, и точки
document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.querySelector('.section-reviews__wrapper');
    const sliderItemsContainer = document.querySelector('.section-reviews__slider-items');
    const sliderItems = document.querySelectorAll('.section-reviews__slider-item');
    const navItems = document.querySelectorAll('.section-reviews__nav-item');

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
            this.navItems.forEach(item => item.classList.remove('active'));
            //меняем индекс слайда
            const navIndex = (this.currentIndex + 2) % this.carouselArray.length;
            this.navItems[navIndex].classList.add('active');

            // удаляем/обновляем классы слайдов
            this.carouselArray.forEach(el => {
                el.classList.remove(
                    'item-0', 'item-1', 'item-2',
                    'item-3', 'item-4', 'item-5',
                    'item-6'
                );
            });

            //новые классы для слайдов
            this.carouselArray.forEach((el, i) => {
                const pos = (i - this.currentIndex + this.carouselArray.length) % this.carouselArray.length;  //расчитываем положение слайда относительно центрального
                el.classList.add(`item-${pos}`);
            });

            setTimeout(() => {
                this.isAnimating = false;
            }, 300);
        }

        setNavControls() {
            this.navItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    this.currentIndex = (index - 2 + this.carouselArray.length) % this.carouselArray.length; //вычесляем индекс и обновляем слайдер
                    this.updateSlider();
                });
            });
        }

        // прокрутка слайдов мышкой
        setupEventListeners() {
            this.carouselContainer.addEventListener('wheel', (e) => {
                e.preventDefault();
                if (this.isAnimating) return;

                if (e.deltaY > 0) {
                    this.currentIndex = (this.currentIndex + 1) % this.carouselArray.length;
                } else {
                    this.currentIndex = (this.currentIndex - 1 + this.carouselArray.length) % this.carouselArray.length;
                }
                this.updateSlider();
            });

            // прокрутка слайдов по  клику на слайд (после чего слайд становится по ценру)
            this.carouselArray.forEach(item => {
                item.addEventListener('click', () => {
                    const index = parseInt(item.getAttribute('data-index'));
                    this.currentIndex = (index - 2 + this.carouselArray.length) % this.carouselArray.length;
                    this.updateSlider();
                });
            });

            this.setNavControls();
        }
    }

    new Carousel(
        sliderContainer,
        sliderItemsContainer,
        sliderItems,
        navItems
    );
});

//================== КОНЕЦ Логика слайдера ====================//