
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('diplomaModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal__close');
    const diplomas = document.querySelectorAll('.about-me__diploma');


    diplomas.forEach(diploma => {
        diploma.addEventListener('click', function () {
            modalImg.src = this.src;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', function () {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });


    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
});

// кнопка back
    document.getElementById("backButton").addEventListener("click", () => {
        console.log('Кнопка "Назад" нажата'); 
        if (window.history.length > 1) {
        window.history.back();
        } else {
        window.location.href = "../../../index.html"; 
        }
    });