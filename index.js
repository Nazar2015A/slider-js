const sliderImages = document.querySelectorAll(".slider__img"),
  sliderLine = document.querySelector(".slider__line"),
  sliderBtnNext = document.querySelector(".slider__btn-next"),
  sliderBtnPrev = document.querySelector(".slider__btn-prev"),
  sliderWrapper = document.querySelector(".slider__wrapper");

let sliderCount = 0,
  sliderWidth;
if (sliderImages.length > 0) {
  sliderWrapper.insertAdjacentHTML(
    "afterbegin",
    `<div class="slider__dot active-dot"></div>`
  );
}

if (sliderImages.length > 1) {
  for (let i = 0; i < sliderImages.length - 1; i++) {
    sliderWrapper.insertAdjacentHTML(
      "beforeend",
      `<div class="slider__dot"></div>`
    );
  }
}

const sliderDots = document.querySelectorAll(".slider__dot");
window.addEventListener("resize", showSlide);

sliderBtnNext.addEventListener("click", nextSlide);
sliderBtnPrev.addEventListener("click", prevSlide);

let number = true;
sliderDots.forEach((item) => {
  item.addEventListener("click", () => {
    number = false;
    setTimeout(() => {
      number = true;
    }, 9000);
  });
});
sliderBtnNext.addEventListener("click", () => {
  number = false;
  setTimeout(() => {
    number = true;
  }, 9000);
});
sliderBtnPrev.addEventListener("click", () => {
  number = false;
  setTimeout(() => {
    number = true;
  }, 9000);
});

let delay = 6000;
setInterval(() => {
  if (number) {
    nextSlide();
    delay = 6000;
  } else {
    delay = 10000;
  }
}, delay);

function showSlide() {
  sliderWidth = document.querySelector(".slider").offsetWidth;
  sliderLine.style.width = sliderWidth * sliderImages.length + "px";
  sliderImages.forEach((item) => (item.style.width = sliderWidth + "px"));

  rollSlider();
}
showSlide();

function nextSlide() {
  sliderCount++;
  if (sliderCount >= sliderImages.length) sliderCount = 0;
  rollSlider();
  thisSlide(sliderCount);
}

function prevSlide() {
  sliderCount--;
  if (sliderCount < 0) sliderCount = sliderImages.length - 1;

  rollSlider();
  thisSlide(sliderCount);
}

function rollSlider() {
  sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}

function thisSlide(index) {
  sliderDots.forEach((item) => item.classList.remove("active-dot"));
  sliderDots[index].classList.add("active-dot");
}

sliderDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    sliderCount = index;
    rollSlider();
    thisSlide(sliderCount);
  });
});
