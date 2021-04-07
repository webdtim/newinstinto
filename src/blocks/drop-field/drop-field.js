  /* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){
  
  const catalogFilter = document.querySelector('#catalogFilter');
  const catalogDropFilterButton = document.querySelector('#catalogDropFilterButton');


  // Смена состояния чекбокса и подсветка
  let changeCheckbox = function(e) {

    if (!e.target.classList.contains('drop-field__input')) return;
    
    if (!e.target.checked) {
      e.target.closest('.drop-field__option').classList.remove('drop-field__option--active');
    } else {
      e.target.closest('.drop-field__option').classList.add('drop-field__option--active');
    }

  }

  let selectCheckbox = function(e) {

    if (!e.target.closest('.drop-field__option')) return;
    if (!e.target.querySelector('.drop-field__input')) return;
    
    let actualCheck = (!e.target.querySelector('.drop-field__input').checked) ? true : false;
    e.target.querySelector('.drop-field__input').checked = actualCheck;

    if (actualCheck === true) {
      e.target.closest('.drop-field__option').classList.add('drop-field__option--active');
    } else {
      e.target.closest('.drop-field__option').classList.remove('drop-field__option--active');
    }

  }

  // Раскрытие фильтра
  let openCheckboxList = function(e) {
    const allTitle = catalogFilter.querySelectorAll('.drop-field__title');

    if (e.target.classList.contains('drop-field__title')) {
      if (!e.target.classList.contains('drop-field__title--active')) {
        // удаляем активный класс у всех активных элементов
        for ( i = 0; i < allTitle.length; i++) {
          allTitle[i].classList.remove('drop-field__title--active');
          allTitle[i].nextElementSibling.classList.remove('drop-field__body-wrap--active');
          allTitle[i].closest('.drop-field__wrap-item').classList.remove('drop-field__wrap-item--active')
        }
      }

      e.target.classList.toggle('drop-field__title--active');
      e.target.nextElementSibling.classList.toggle('drop-field__body-wrap--active');
      e.target.closest('.drop-field__wrap-item').classList.toggle('drop-field__wrap-item--active');
    }

  }

  // // Применить и закрыть список опций
  // let sendAndClose = function(e) {
  //   if (!e.target.)
  // }

  let dropField = function() {

    catalogFilter.classList.toggle('content__inner--close');

    setTimeout(rangeInit('.range', '.range__between', '.range__btn', '.range__btn-1', '.range__btn-2', '#range__field-1', '#range__field-2'), 0);

  }

  // ============
  // Double range
  // ============
  function rangeInit(range, betwn, btns, btn1, btn2, input1, input2) {
    const slider = document.querySelector(range),
          between = slider.querySelector(betwn),
          buttons = slider.querySelectorAll(btns),
          button1 = slider.querySelector(btn1),
          button2 = slider.querySelector(btn2),
          inpt1 = document.querySelector(input1),
          inpt2 = document.querySelector(input2);

    let min = inpt1.min,
        max = inpt1.max;

    /* получаем координаты */
    let sliderCoords = getCoords(slider);
    /* начальное положение */
    button1.style.marginLeft = '0px';
    button2.style.marginLeft = (slider.offsetWidth-button1.offsetWidth) + 'px';
    between.style.width = (slider.offsetWidth-button1.offsetWidth) + 'px';
    inpt1.value = min;
    inpt2.value = max;

    function inptChange(evt) {
        
      if (evt.target.id==='range__field-1') {
        /* Если кнопка выходит за лимиты значений атрибута min or max, то присваимваем ей значение этих атрибутов */
        if (parseInt(inpt1.value) < min) inpt1.value = min;
        if (parseInt(inpt1.value) > max) inpt1.value = max;
      } else {
        if (parseInt(inpt2.value) < min) inpt2.value = min;
        if (parseInt(inpt2.value) > max) inpt2.value = max;
      }

      /* Если один ползунок переходит за другой, то меняем местами их значения */
      if (parseInt(inpt1.value) > parseInt(inpt2.value)) {
        let temp = inpt1.value;
        inpt1.value = inpt2.value;
        inpt2.value = temp;
      }
      
      let sliderCoords = getCoords(slider);
      /* высчитываем проценты для сдвига margin */
      let per1 = parseInt(inpt1.value-min)*100/(max-min);
      let per2 = parseInt(inpt2.value-min)*100/(max-min);
      let left1 = per1*(slider.offsetWidth-button1.offsetWidth)/100;
      let left2 = per2*(slider.offsetWidth-button1.offsetWidth)/100;
      
      /* Сдвигаем кнопки */
      button1.style.marginLeft = left1 + 'px'; 
      button2.style.marginLeft = left2 + 'px';
      
      /* Изменяем ширину и двигаем полосу индикатора */
      if (left1 > left2) {
        between.style.width = (left1-left2) + 'px';
        between.style.marginLeft = left2 + 'px';
      }
      else {
        between.style.width = (left2-left1) + 'px';
        between.style.marginLeft = left1 + 'px';  
      }
    }

    inpt1.addEventListener('change', inptChange);
    inpt2.addEventListener('change', inptChange);
    
    /*moveBtn*/
    function rangeBtnDown(evt) {

      let sliderCoords = getCoords(slider);
      let betweenCoords = getCoords(between); 
      let buttonCoords1 = getCoords(button1);
      let buttonCoords2 = getCoords(button2);
      let shiftX2 = evt.pageX - buttonCoords2.left; 
      let shiftX1 = evt.pageX - buttonCoords1.left;

      let chekBtn = false;
      if (evt.target == button1) {
        chekBtn = true;
      }
    
      function rangeBtnMove(evt) {

        let left1, left2;
          
        if (chekBtn === true) {

          left1 = evt.pageX - shiftX1 - sliderCoords.left;
          let right1 = slider.offsetWidth - button1.offsetWidth;
          if (left1 < 0) left1 = 0;
          if (left1 > right1) left1 = right1;
          button1.style.marginLeft = left1 + 'px';

          shiftX2 = evt.pageX - buttonCoords2.left; 
          left2 = evt.pageX - shiftX2 - sliderCoords.left;
          let right2 = slider.offsetWidth - button2.offsetWidth;
          if (left2 < 0) left2 = 0;
          if (left2 > right2) left2 = right2;

        } else {

          left2 = evt.pageX - shiftX2 - sliderCoords.left;
          let right2 = slider.offsetWidth - button2.offsetWidth;
          if (left2 < 0) left2 = 0;
          if (left2 > right2) left2 = right2;
          button2.style.marginLeft = left2 + 'px';                      
        
          shiftX1 = evt.pageX - buttonCoords1.left; 
          left1 = evt.pageX - shiftX1 - sliderCoords.left;
          let right1 = slider.offsetWidth - button1.offsetWidth;  
          if (left1 < 0) left1 = 0;
          if (left1 > right1) left1 = right1;

        }

        let per_min = 0;
        let per_max = 0;

        if (left1 > left2) {

          between.style.width = (left1-left2) + 'px';
          between.style.marginLeft = left2 + 'px';
           
          per_min = left2*100/(slider.offsetWidth-button1.offsetWidth);
          per_max = left1*100/(slider.offsetWidth-button1.offsetWidth);

        } else {

          between.style.width = (left2-left1) + 'px';
          between.style.marginLeft = left1 + 'px';                
          
          per_min = left1*100/(slider.offsetWidth-button1.offsetWidth);
          per_max = left2*100/(slider.offsetWidth-button1.offsetWidth);

        }

        inpt1.value= (parseInt(min)+Math.round((max-min)*per_min/100));
        inpt2.value= (parseInt(min)+Math.round((max-min)*per_max/100));
      }

      function rangeBtnUp() {
        document.removeEventListener('pointermove', rangeBtnMove);
        inpt1.dispatchEvent(new Event('change'));
        inpt2.dispatchEvent(new Event('change'));
        document.removeEventListener('pointerup', rangeBtnUp);
      }

      document.addEventListener('pointermove', rangeBtnMove);
      document.addEventListener('pointerup', rangeBtnUp);

      return false;
    }

    for (let i=0; i < buttons.length; i++) {
      buttons[i].addEventListener('pointerdown', rangeBtnDown);
    }
      
    button1.ondragstart = function() {
      return false;
    }
    button2.ondragstart = function() {
      return false;
    }

    function getCoords(elem) {
      var box = elem.getBoundingClientRect();
      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      }
    }
  }
  // ============
  // END double range
  // ============

  // проверяем наличие элемента на странице
  if (catalogFilter) {
    catalogFilter.addEventListener('change', changeCheckbox);
    catalogFilter.addEventListener('click', selectCheckbox);
    catalogFilter.addEventListener('click', openCheckboxList);
    // catalogFilter.addEventListener('click', sendAndClose);
    catalogDropFilterButton.addEventListener('click', dropField);
  }



});
