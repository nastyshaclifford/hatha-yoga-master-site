const practicesData = [
  {
    title:
      "«Здоровая спина» — заботьтесь о своем здоровье и комфорте каждый день",
    description: [
      {
        text: "Ваш позвоночник — основа вашего благополучия. Наш курс «Здоровая спина» создан, чтобы помочь вам избавиться от боли, повысить гибкость и укрепить мышцы спины, делая каждое движение легким и приятным.",
        className: "p-1",
      },
      {
        text: "Что вас ждет:",
        className: "p-2",
      },
      {
        text: "Комплексные упражнения — специально подобранные практики для укрепления мышц спины, шеи и поясницы. Техники растяжки и мобилизации — улучшение гибкости и подвижности суставов. Дыхательные практики и релаксация — снятие напряжения, стрессов и восстановление энергетического баланса. Профилактика и коррекция осанки — советы и упражнения для правильной осанки в повседневной жизни. Индивидуальный подход — программа адаптирована под ваши особенности и уровень подготовки. Подарите себе здоровье, комфорт и свободу движений!",
        className: "p-3",
      },
    ],
    image: "./assets/images/modal1.png",
  },
  {
    title: "Растяжка в йоге — путь к гибкости и гармонии",
    description: [
      {
        text: "Откройте для себя искусство мягкого и глубокого вытяжения, которое помогает раскрыть потенциал вашего тела, снять напряжение и восстановить баланс. В каждом движении — забота о себе, укрепление связок и суставов, а также ощущение легкости и свободы. Пусть ваша практика растяжки станет источником вдохновения и внутренней гармонии.",
        className: "practice-item2",
      },
    ],
    image: "./assets/images/modal2.png",
  },
  {
    title: "Практика «Сложные асаны» — вызов для тела и разума",
    description: [
      {
        text: "Погрузитесь в мир продвинутых поз, которые развивают силу, гибкость и концентрацию. Эта практика поможет преодолеть границы возможностей, укрепить внутреннюю стойкость и достичь новых высот в йоге. Испытайте себя и почувствуйте невероятное удовлетворение от каждого выполненного сложного асана!",
        className: "practice-item3",
      },
    ],
    image: "./assets/images/modal3.png",
  },
  {
    title:
      "Медитация с поющими чашами — погружение в гармонию и внутренний покой",
    description: [
      {
        text: "Позвольте звукам поющих чаш наполнить ваше сердце спокойствием, снять напряжение и восстановить баланс энергии. Эта практика помогает глубже сосредоточиться, очистить ум и обрести гармонию с собой. Откройте для себя силу звука и почувствуйте, как каждая волна вибрации наполняет вас умиротворением.",
        className: "practice-item4",
      },
    ],
    image: "./assets/images/modal4.png",
  },
];

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalImage = document.getElementById("modal-image");
const closeBtn = document.querySelector(".modal-close");

document.querySelectorAll(".more-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-modal-id");
    const practice = practicesData[id];

    modalTitle.textContent = practice.title;
    modalImage.src = practice.image;

    modalDescription.innerHTML = "";

    practice.description.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph.text;
      if (paragraph.className) {
        p.classList.add(paragraph.className);
      }
      modalDescription.appendChild(p);
    });

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }
});

document.getElementById("buy-btn").addEventListener("click", function () {
  window.open(
    "https://forms.yandex.ru/cloud/6865201584227c58309d0cde",
    "_blank"
  );
});
