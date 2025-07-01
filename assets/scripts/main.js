document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.nav__burger');
    const menu = document.querySelector('.nav__menu');

    burger.addEventListener('click', () => {
        menu.classList.toggle('show');
    });
});