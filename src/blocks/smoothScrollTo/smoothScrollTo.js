/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){

  window.smoothScrollTo = (scrollTo, timeDuration) => {

    const curScroll = window.pageYOffset
    const scrollDiff = (curScroll - scrollTo) * -1
    
    animate({
      duration: timeDuration,
      timing: function(timeFraction) {
        return Math.pow(timeFraction, 2);
      },
      draw: function(progress) {
        const scrollStep = curScroll + progress * scrollDiff
        window.scrollTo(0, scrollStep);
      }
    })

  }

  function animate({timing, draw, duration}) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      // timeFraction изменяется от 0 до 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      // вычисление текущего состояния анимации
      let progress = timing(timeFraction);

      draw(progress); // отрисовать её

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }

    })
  }
});
