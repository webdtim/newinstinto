/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){

  const chooseBlockWrap = document.querySelector('.choose-block__wrap')

  let chooseCheckbox = function(e) {
    // если клик не по элементу, прерываем
    if (!e.target.closest('.choose-block')) return

    const chooseBlock = e.target.closest('.choose-block'),
          checkbox = chooseBlock.querySelector('input'),
          allChooseBlock = e.target.closest('.choose-block__wrap').querySelectorAll('.choose-block')

    if (e.target.type == 'radio') return

    // если инпут активен, то прерываем функцию
    if (checkbox.checked === true) return

    // удаляем активные классы
    for (let i = 0; i < allChooseBlock.length; i++) {
      allChooseBlock[i].classList.remove('choose-block--active')
    }

    // добавляем активный класс и состояние инпута
    chooseBlock.classList.add('choose-block--active')
    checkbox.checked = !checkbox.checked

  }

  if (chooseBlockWrap){
    // Записываем коллекцию в переменную
    let chooseArray = document.querySelectorAll(".choose-block__wrap")
    // перебираем коллекцию и навешиваем обработчик событий
    for (let i = 0; i < chooseArray.length; i++) {
      chooseArray[i].addEventListener('click', chooseCheckbox)
    }
  }

});
