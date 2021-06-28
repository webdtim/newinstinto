/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){
  const freeShip = document.querySelector('.free-shipping')

  if (freeShip) {

    let changeIndicator = function() {

      const indicator = freeShip.querySelector('.free-shipping__indicator-fill'),
      freeSum = Number(freeShip.dataset.freeShipPrice),
      descrFreeShip = freeShip.querySelector('.free-shipping__description'),
      rangeFreeShip = freeShip.querySelector('.free-shipping__range'),
      priceForFreeShip = rangeFreeShip.querySelector('span')

      let actualSum = Number(freeShip.dataset.curCartTotal)

      let difference = freeSum - actualSum

      if (difference <= 0) {
        // Если сумма заказа больше или равна freeSum
        descrFreeShip.textContent = 'Вам доступна бесплатная Доставка!'
        rangeFreeShip.textContent = 'Ура! Доставка будет БЕСПЛАТНОЙ'
        indicator.style.width = '100%'
      } else {
        // Если сумма заказа меньше freeSum
        priceForFreeShip.textContent = difference + '₽'
        indicator.style.width = 100 / (freeSum / actualSum) + '%'
      }

    }

    changeIndicator()

    // использование в стороннем скрипте
    window.initFreeShip = changeIndicator

    // // отслеживаем изменение атрибутов
    // let observer = new MutationObserver (() => changeIndicator())
    // observer.observe(freeShip, {attributes: true})
  }
});
