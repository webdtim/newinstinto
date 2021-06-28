/* global document */

// const closest = require('closest');
const ready = require('../../js/utils/documentReady.js');

ready(function(){

  const fieldsText = document.querySelectorAll('input[required]')
  if (fieldsText) {

    //real-time validation
    for (let field of fieldsText) {
      field.addEventListener('focus', (e) => {
        const field = e.target
        removeError(field)
      })
      field.addEventListener('blur', (e) => {
        const field = e.target
        validateField(field)
      })
    }

    let errorCount

    window.validate = (form) => {
      errorCount = 0
      validateForm(form)
      if (errorCount >= 1) return false
      return true
    }

    function validateForm(form) {
      const fields = form.querySelectorAll('input[required]')

      for (let field of fields) {
        validateField(field)
      }
    }

    function validateField(field) {
      const fieldType = field.getAttribute('type')

      if (isEmpty(field)) {
        // empty field
        addError(field)
      } else {
        // not an empty field
        switch (fieldType) {
          case 'radio':
            if (!radioCheck(field)) addError(field)
            break
          case 'checkbox': break
          case 'tel':
            numberCheck(field)? removeError(field) : addError(field, 'Кажется тут недостаточно цифр')
            break
          case 'email':
            emailCheck(field)? removeError(field) : addError(field, 'Неверно указан email')
            break
          case 'text':
            removeError(field)
        }
      }
    }

    function isEmpty(input) {
      const empty = input.value.replace(/\s+/g, ' ').trim()
      return (!empty) ? true : false
    }

    function radioCheck(input) {
      const form = input.closest('form'),
            name = input.getAttribute('name'),
            inputChecked = form.querySelector(`input[name="${name}"]:checked`)
      return (!inputChecked) ? false : true
    }

    function numberCheck(input) {
      const amountOfNumbers = input.value.replace(/[^\d]/g, '').length
      return (amountOfNumbers < 11) ? false : true
    }

    function emailCheck(input) {
      const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
            correctEmail = reg.test(input.value)
      return (!correctEmail) ? false : true
    }

    function addError(input, msgText) {
      const fieldText = input.closest('.field-text'),
            errorClass = 'field-text--error',
            helpText = input.nextSibling

      // count error
      errorCount += 1

      if (!fieldText) return
      if (!msgText) msgText = 'Пожалуйста, заполните поле'
      fieldText.classList.add(errorClass)
      if (helpText) helpText.remove()
      //add helpText
      input.insertAdjacentHTML('afterend', `<span class="field-text__help-text">${msgText}</span>`)
    }

    function removeError(input) {
      const fieldText = input.closest('.field-text'),
            errorClass = 'field-text--error',
            helpText = input.nextSibling

      if (!fieldText) return
      fieldText.classList.remove(errorClass)
      if (helpText) helpText.remove()
    }
  }

});
