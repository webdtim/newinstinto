/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){

  function selectCheckbox(e) {

    if (!e.target.classList.contains('drop-field__input')) return;
    if (!e.target.checked) {
      e.target.closest('.drop-field__item').classList.remove('drop-field__item--active');
    } else {
      e.target.closest('.drop-field__item').classList.add('drop-field__item--active');
    }
  }

  document.querySelector('#catalogFilter').addEventListener('change', selectCheckbox);

  function openCheckboxList(e) {

    if (!e.target.classList.contains('drop-field__title')) return;
    if (!e.target.closest('.drop-field__inner')) return;
    e.target.closest('.drop-field__inner').classList.toggle('drop-field__inner--open');
  }

  document.querySelector('#catalogFilter').addEventListener('click', openCheckboxList);

  function dropField() {

    document.querySelector('#catalogFilter').classList.toggle('close');
  }

  document.querySelector('#catalogDropFilterButton').addEventListener('click', dropField);
});
