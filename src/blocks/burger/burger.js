/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){

  var burgers = document.querySelectorAll('.burger');

  for (var i = 0; i < burgers.length; i++) {
    var burger = burgers[i];
    burger.addEventListener('click', showBurgerTarget);
  }

  function showBurgerTarget() {
    var targetId = this.getAttribute('data-target-id');
    var targetClassToggle = this.getAttribute('data-target-class-toggle');
    var targetScrollBlock = this.getAttribute('data-target-scroll-block');
    var scrollBlockClass = this.getAttribute('data-scroll-block-class');
    
    if (targetId && targetClassToggle) {
      this.classList.toggle('burger--close');
      document.getElementById(targetId).classList.toggle(targetClassToggle);
      // Доработка кода (бургер в шапке)
      const parrentContainer = this.closest('.burger__container');
      // получаем доступ к родителю, для смены цвета кнопки
      if (parrentContainer) parrentContainer.classList.toggle('burger__container--active');
    }

    if (targetScrollBlock) {
      document.querySelector(targetScrollBlock).classList.toggle(scrollBlockClass)
    }
  }

});
