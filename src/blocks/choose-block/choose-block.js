/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){

  const chooseBlockWrap = document.querySelector('.choose-block__wrap')

  let chooseCheckbox = function(e) {

    if (!e.target.closest('.choose-block')) return

    const chooseBlock = e.target.closest('.choose-block'),
          checkbox = chooseBlock.querySelector('input')

    if (e.target.type == 'checkbox') {
      checkbox.checked = !checkbox.checked
      return
    }

    if (!chooseBlock) return
    checkbox.checked = !checkbox.checked
    chooseBlock.classList.toggle('choose-block--active')
  }

  if (chooseBlockWrap){
    chooseBlockWrap.addEventListener('click', chooseCheckbox)
  }

});
