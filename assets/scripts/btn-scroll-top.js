const btnScrollTop = document.querySelector(".scroll-top");

// показываем (скрываем) кнопку при скролле
window.addEventListener("scroll", () => {
  if (window.pageYOffset >= 350) {
    btnScrollTop.classList.add("show");
  } else {
    btnScrollTop.classList.remove("show");
  }
});

// плавная прокрутка при клике
btnScrollTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});