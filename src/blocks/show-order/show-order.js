/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){
  const showOrder = document.querySelector('.show-order')

  if (showOrder) {
    const showOrderBtn = document.querySelectorAll('.btn--show-order')

    let openOrder = function(e) {
      showOrder.classList.add('show-order--open')

      changeBtn(e)

      if (document.documentElement.scrollWidth > 650) return

      // обнуляем отступ
      let orderCardArr = document.querySelectorAll('.order-card')
      for ( let i = 0; i < orderCardArr.length ; i++) {
        orderCardArr[i].style.marginBottom = '40px'
      }

      changePos(e)
    }

    function changeBtn(e) {
      // Возвращаем к стандартному значению кнопки
      let btnsOrderClose = document.querySelectorAll('.btn--close-order')
      for ( let i = 0; i < btnsOrderClose.length ; i++) {
        btnsOrderClose[i].classList.remove('btn--close-order')
        btnsOrderClose[i].classList.add('btn--show-order')
        btnsOrderClose[i].textContent = 'Смотреть заказ'
      }

      e.target.classList.remove('btn--show-order')
      e.target.classList.add('btn--close-order')
      e.target.textContent = 'Скрыть заказ'

      e.target.addEventListener('click', closeOrder)
    }

    function closeOrder(e) {
      showOrder.classList.remove('show-order--open')

      e.target.closest('.order-card').style.marginBottom = '40px'

      e.target.removeEventListener('click', closeOrder)
      e.target.classList.remove('btn--close-order')
      e.target.classList.add('btn--show-order')
      e.target.textContent = 'Смотреть заказ'
    }

    function changePos(e) {
      let orderCard = e.target.closest('.order-card')
      let cardPos = orderCard.getBoundingClientRect().top
      let top = (cardPos + pageYOffset).toFixed(1)
      changeStyle(top, orderCard)
    }

    function changeStyle(posTop, orderCard) {
      showOrder.style.top = (Number(posTop) + orderCard.offsetHeight + 20 + "px")
      orderCard.style.marginBottom = showOrder.offsetHeight + 50 + 'px'
    }

    for( let i = 0; i < showOrderBtn.length; i++ ) {
      showOrderBtn[i].addEventListener('click', openOrder)
    }
  }
});
