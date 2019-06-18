class Slider {
  constructor(config) {
    const id = config.id;
    const slideCount = config.slideCount;
    let transition = 0;
    let maxTransition = 0;
    let minTransition = 0;
    let container = document.querySelector(`#${id}`);
    createSlider(id, slideCount);
    function createSlider(id, slideCount) {
      container.style.position = 'relative';
      let slideList = `<div class="slide-list">${container.innerHTML}
${container.innerHTML}
${container.innerHTML}</div>`;
      container.innerHTML = slideList;
      container.style.overflow = 'hidden';
      let slides = [...container.querySelector('.slide-list').children];
      slides.forEach((slide) => {
        slide.style.minWidth = `calc(${container.offsetWidth / slideCount}px - 20px)`;
        slide.style.marginRight = '20px';
      });
      transition = 0 - ((slides[0].offsetWidth + 20) * (slides.length / 3));
      let wrapper = container.querySelector('.slide-list');
      wrapper.style.transform = `translateX(${transition}px)`;
      minTransition = transition;
      maxTransition = transition + transition;
      container.innerHTML += `<button class="right"></button>
        <button class="left"></button>`;
    }

    function moveRight() {
      let slides = [...container.querySelector('.slide-list').children];
      let slideList = container.querySelector('.slide-list');
      transition -= slides[0].offsetWidth + 20;
      slideList.style.transition = `.75s`;
      slideList.style.transform = `translateX(${transition}px)`;
      container.querySelector('.right').removeEventListener('click', moveRight);
    }

    function moveLeft() {
      let slides = [...container.querySelector('.slide-list').children];
      let slideList = container.querySelector('.slide-list');
      transition += slides[0].offsetWidth + 20;
      slideList.style.transition = `.75s`;
      slideList.style.transform = `translateX(${transition}px)`;
      container.querySelector('.left').removeEventListener('click', moveLeft);
    }

    container.querySelector('.left').addEventListener('click', moveLeft);
    container.querySelector('.right').addEventListener('click', moveRight);

    container.querySelector('.slide-list').addEventListener('transitionend', (event) => {
      container.querySelector('.right').addEventListener('click', moveRight);
      container.querySelector('.left').addEventListener('click', moveLeft);
      let slideList = container.querySelector('.slide-list');
      if (transition > minTransition) {
        transition += minTransition;
        slideList.style.transition = '';
        slideList.style.transform = `translateX(${transition}px)`;
      } else if (transition < maxTransition) {
        transition -= minTransition;
        slideList.style.transition = '';
        slideList.style.transform = `translateX(${transition}px)`;
      }
    });
  }
}
