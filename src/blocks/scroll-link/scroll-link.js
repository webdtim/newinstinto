/* global document window performance requestAnimationFrame */

// const ready = require('../../js/utils/documentReady.js');

// ready(function(){

//   var links = document.querySelectorAll('[href^="#"][data-scroll-link]');
//   if (links) {

//     for (var i = 0; i < links.length; i++) {
//       links[i].addEventListener('click', function(e) {
//         var hash = this.href.replace(/[^#]*(.*)/, '$1');
//         if(hash && hash !== '#') {
//           e.preventDefault();
//           var scroll = window.pageYOffset;
//           var targetTop = getOffsetRect(document.querySelector(hash)).top - 10; // С поправкой в 10px
//           var scrollDiff = (scroll - targetTop) * -1;
//           animate({
//             duration: 500,
//             timing: function(timeFraction) {
//               return Math.pow(timeFraction, 4); // https://learn.javascript.ru/js-animation
//             },
//             draw: function(progress) {
//               var scrollNow = scroll + progress * scrollDiff;
//               window.scrollTo(0,scrollNow);
//             }
//           });
//         }
//       }, false);
//     }

//     function animate(_ref) {
//       var timing = _ref.timing,
//           draw = _ref.draw,
//           duration = _ref.duration;
//       var start = performance.now();
//       requestAnimationFrame(function animate(time) {
//         var timeFraction = (time - start) / duration;
//         if (timeFraction > 1) timeFraction = 1;
//         var progress = timing(timeFraction);
//         draw(progress);
//         if (timeFraction < 1) {
//           requestAnimationFrame(animate);
//         }
//       });
//     }

//     function getOffsetRect(elem) {
//       var box = elem.getBoundingClientRect()
//       var body = document.body
//       var docElem = document.documentElement
//       var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
//       var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
//       var clientTop = docElem.clientTop || body.clientTop || 0
//       var clientLeft = docElem.clientLeft || body.clientLeft || 0
//       var top  = box.top +  scrollTop - clientTop
//       var left = box.left + scrollLeft - clientLeft
//       return { top: Math.round(top), left: Math.round(left) }
//     }
//   }

// });



// // Для всех форм страницы
//   const forms = Array.from(document.querySelectorAll('form[data-check-form]'));
//   forms.forEach(function(form){
//     // Подпишемся на событие отправки
//     form.addEventListener('submit', function(e){
//       let valid = true;
//       // Проверим все текстовые инпуты
//       const fieldsText = Array.from(form.querySelectorAll('input[data-check-pattern]'));
//       fieldsText.forEach(function(input){
//         if(!checkFieldText(input)) valid = false;
//       });
//       // Проверим все чекбоксы
//       const fieldsCheckbox = Array.from(form.querySelectorAll('input[data-check-state]'));
//       fieldsCheckbox.forEach(function(input){
//         if(!checkFieldCheckbox(input)) valid = false;
//       });
//       // Если были ошибки, не отправляем форму
//       if(!valid) e.preventDefault();
//     });
//   });

//   // Для всех проверяемых текстовых полей
//   const fieldsText = Array.from(document.querySelectorAll('input[data-check-pattern]'));
//   fieldsText.forEach(function(input){
//     let hasBeenAlreadyBlured = false;
//     input.addEventListener('blur', function(){ 
//       checkFieldText(input); 
//       if(!hasBeenAlreadyBlured) hasBeenAlreadyBlured = true;
//     });
//     input.addEventListener('input', function(){ if(hasBeenAlreadyBlured) checkFieldText(input); });
//   });

//   // Для всех проверяемых чекбоксов
//   const fieldsCheckbox = Array.from(document.querySelectorAll('input[data-check-state]'));
//   fieldsCheckbox.forEach(function(input){
//     input.addEventListener('change', function(){ checkFieldCheckbox(input); });
//   });

//   function checkFieldText(input) {
//     const regExp = new RegExp(input.dataset.checkPattern, 'gi');
//     const result = regExp.test(input.value);
//     const errorClass = 'field-text--error';
//     const parent = closest(input, '.field-text');
//     result ? parent.classList.remove(errorClass) : parent.classList.add(errorClass);
//     return result;
//   }

//   function checkFieldCheckbox(input) {
//     const trueVal = input.dataset.checkState == 'on' ? true : false;
//     const result = trueVal === input.checked
//     const errorClass = 'field-checkbox__input-wrap--error';
//     const parent = closest(input, '.field-checkbox__input-wrap');
//     result ? parent.classList.remove(errorClass) : parent.classList.add(errorClass);
//     return result;
//   }