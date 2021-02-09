/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){
  const freeShip = document.querySelector('.free-shipping')

  if (freeShip) {

    let changeIndicator = function() {

      const indicator = freeShip.querySelector('.free-shipping__indicator-fill'),
      freeSum = 5000,
      descrFreeShip = freeShip.querySelector('.free-shipping__description'),
      rangeFreeShip = freeShip.querySelector('.free-shipping__range'),
      priceForFreeShip = rangeFreeShip.querySelector('span')

      let actualSum = document.querySelector('.your-order__price-big').textContent.replace(/\s+/g, '').replace('₽', '')

      let difference = freeSum - actualSum

      if (difference <= 0) {
        // Если сумма заказа больше или равна freeSum (5000)
        descrFreeShip.textContent = 'Вам доступна бесплатная Доставка!'
        rangeFreeShip.textContent = 'Ура! Доставка будет БЕСПЛАТНОЙ'
        indicator.style.width = '100%'
      } else {
        // Если сумма заказа меньше freeSum (5000)
        priceForFreeShip.textContent = difference + '₽'
        indicator.style.width = 100 / (freeSum / actualSum) + '%'
      }


      
    }

    changeIndicator()
  }
});
