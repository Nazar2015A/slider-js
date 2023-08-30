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

let dots = true;
let time = null;
let interval = null;
let delay = 5000;
let timeOutDelay = delay / 5;

sliderDots.forEach((item) => {
  item.addEventListener("click", () => {
    clearTimeout(time);
    clearInterval(interval);
    dots = false;
    time = setTimeout(() => {
      dots = true;
      prod();
    }, delay / 5);
  });
});
const prod = () => {
  if (dots) {
    interval = setInterval(() => {
      nextSlide();
    }, delay);
  }
};
prod();
sliderBtnNext.addEventListener("click", () => {
  clearTimeout(time);
  clearInterval(interval);
  dots = false;
  time = setTimeout(() => {
    dots = true;
    prod();
  }, timeOutDelay);
});
sliderBtnPrev.addEventListener("click", () => {
  clearTimeout(time);
  clearInterval(interval);
  dots = false;
  time = setTimeout(() => {
    dots = true;
    prod();
  }, timeOutDelay);
});

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
