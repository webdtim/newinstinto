  const catalogFilter = document.querySelector('#catalogFilter');
  const catalogDropFilterButton = document.querySelector('#catalogDropFilterButton');

  function selectCheckbox(e) {

    if (!e.target.classList.contains('drop-field__input')) return;
    
    if (!e.target.checked) {
      e.target.closest('.drop-field__item').classList.remove('drop-field__item--active');
    } else {
      e.target.closest('.drop-field__item').classList.add('drop-field__item--active');
    }
  }

  function openCheckboxList(e) {

    if (!e.target.classList.contains('drop-field__title')) return;
    
    if (!e.target.closest('.drop-field__inner')) return;
    e.target.closest('.drop-field__inner').classList.toggle('drop-field__inner--open');
  }

  function dropField() {

    catalogFilter.classList.toggle('content__inner--close');
  }

  // проверяем наличие элемента на странице
  if (catalogFilter) {
    catalogFilter.addEventListener('change', selectCheckbox);
    catalogFilter.addEventListener('click', openCheckboxList);
  }

  if (catalogDropFilterButton) catalogDropFilterButton.addEventListener('click', dropField);
