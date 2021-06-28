/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){

  const fields = document.querySelectorAll( '.field-num' );

  if(fields.length) {
    const changeNum = function(e) {

      const field = e.target.closest('.field-num'),
            input = field.querySelector('.field-num__input'),
            valueMin = input.getAttribute('min') ? +input.getAttribute('min') : -Infinity,
            valueMax = input.getAttribute('max') ? +input.getAttribute('max') : Infinity,
            valueStep = input.getAttribute('step') ? +input.getAttribute('step') : 1
    
      if (e.target.classList.contains('field-num__btn') && !input.getAttribute('disabled')) {
        const eventBtnPlus = e.target.classList.contains('field-num__btn--plus'),
              eventBtnMinus = e.target.classList.contains('field-num__btn--minus'),
              btnPlus = field.querySelector('.field-num__btn--plus'),
              btnMinus = field.querySelector('.field-num__btn--minus')

        let num = parseInt(input.value)
        if (isNaN(num)) num = 0

        if (eventBtnPlus) {
          if (num < valueMax) input.value = num + valueStep
        }
        if (eventBtnMinus) {
          if (num > valueMin) input.value = num - valueStep
        }

        if (input.value <= 1) {
          btnMinus.setAttribute('disabled', 'disabled')
        } else if (btnMinus.hasAttribute('disabled')) {
          btnMinus.removeAttribute('disabled')
        }

        if (input.value >= valueMax) {
          btnPlus.setAttribute('disabled', 'disabled')
        } else if (btnPlus.hasAttribute('disabled')) {
          btnPlus.removeAttribute('disabled')
        }
      }
    }

    //валидация при вводе
    const validation = function(e) {
      const input = e.target,
            valueMin = input.getAttribute('min') ? +input.getAttribute('min') : -Infinity,
            valueMax = input.getAttribute('max') ? +input.getAttribute('max') : Infinity,
            field = e.target.closest('.field-num'),
            btnPlus = field.querySelector('.field-num__btn--plus'),
            btnMinus = field.querySelector('.field-num__btn--minus')

      if (btnMinus.hasAttribute('disabled')) btnMinus.removeAttribute('disabled')
      if (btnPlus.hasAttribute('disabled')) btnPlus.removeAttribute('disabled')

      if (input.value >= valueMax) {
        input.value = valueMax
        btnPlus.setAttribute('disabled', 'disabled')
      } else if (input.value <= valueMin) {
        input.value = valueMin
        btnMinus.setAttribute('disabled', 'disabled')
      }
    }

    for (let field of fields) {
      field.addEventListener('click', changeNum)
      field.querySelector('.field-num__input').addEventListener('change', validation)
    }

    // использование в стороннем скрипте
    window.initFieldsNum = () => {
      for (let field of fields) {
        field.removeEventListener('click', changeNum)
        field.querySelector('.field-num__input').removeEventListener('change', validation)
      }

      for (let field of fields) {
        field.addEventListener('click', changeNum)
        field.querySelector('.field-num__input').addEventListener('change', validation)
      }
    }
  }

});
