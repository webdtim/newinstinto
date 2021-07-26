/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){

  const carouselList = document.querySelectorAll('.carousel')

  if (carouselList) {

    function initCarousels(carouselList) {
      for (let i = 0; i < carouselList.length; i ++) {
        new Carousel(carouselList[i])
      }
    }

    initCarousels(carouselList)

    function Carousel(carousel) {
      const privates = {}
      let xDown, yDown, xUp, yUp, xDiff, yDiff

      privates.sel = {
        "itemWrap": carousel.querySelector('.carousel__item-wrap'),
        "item": carousel.querySelector('.carousel__item'),
        "items": carousel.querySelectorAll('.carousel__item'),
        "prev": carousel.querySelector('.carousel__control--prev'),
        "next": carousel.querySelector('.carousel__control--next'),
        "ellipses": carousel.querySelector('.carousel__ellipses')
      }

      privates.opt = {
        "position": 0,
        "marginWidth": parseInt(getComputedStyle(privates.sel.item).marginRight, 10),
        "allowMove": true
      }

      const createEllipses = function() {
        const scrollableItem = Math.round((privates.sel.itemWrap.clientWidth / (privates.sel.item.clientWidth + privates.opt.marginWidth)) - (carousel.clientWidth / (privates.sel.item.clientWidth + privates.opt.marginWidth)))
        if (scrollableItem < 1) return
        for (let i = 0; i <= scrollableItem; i++) {
          privates.sel.ellipses.insertAdjacentHTML('beforeend', '<div class="carousel__ellipse"></div>')
        }
        privates.sel.ellipses.firstElementChild.classList.add('carousel__ellipse--active')
      }
      createEllipses()

      const removeActiveClass = function() {
        for (let i = 0; i < privates.sel.ellipses.children.length; i++) {
          privates.sel.ellipses.children[i].classList.remove('carousel__ellipse--active')
        }
      }


      this.nextSlide = () => {

        const step = privates.sel.item.clientWidth + privates.opt.marginWidth,
        maxPosition = privates.sel.itemWrap.clientWidth - carousel.clientWidth - step + privates.opt.marginWidth

        // set the permission for switching slides
        if (privates.opt.position <= -maxPosition) privates.opt.allowMove = false
        else privates.opt.allowMove = true

        if (privates.opt.allowMove){
          privates.opt.position -= step
          privates.sel.itemWrap.style.transform = `translateX(${privates.opt.position}px)`

          // changing the active class of the ellipse
          const actualEllipse = -Math.round(privates.opt.position / step)
          removeActiveClass()
          privates.sel.ellipses.children[actualEllipse].classList.add('carousel__ellipse--active')
        }
      }


      this.prevSlide = () => {
        const step = privates.sel.item.clientWidth + privates.opt.marginWidth
        // set the permission for switching slides
        if (privates.opt.position >= 0) privates.opt.allowMove = false
        else privates.opt.allowMove = true

        if (privates.opt.allowMove){
          privates.opt.position += step
          if (privates.opt.position > 0) privates.opt.position = 0
          privates.sel.itemWrap.style.transform = `translateX(${privates.opt.position}px)`

          // changing the active class of the ellipse
          const actualEllipse = -Math.round(privates.opt.position / step)
          removeActiveClass()
          privates.sel.ellipses.children[actualEllipse].classList.add('carousel__ellipse--active')
        }
      }


      this.goTo = (e) => {
        if (e.target === privates.sel.ellipses) return

        const step = privates.sel.item.clientWidth + privates.opt.marginWidth,
        maxPosition = privates.sel.itemWrap.clientWidth - carousel.clientWidth - privates.opt.marginWidth
        
        for (let i = 0; i < privates.sel.ellipses.children.length; i++) {
          if (e.target === privates.sel.ellipses.children[i]) {
            removeActiveClass()
            privates.sel.ellipses.children[i].classList.add('carousel__ellipse--active')
            
            privates.opt.position = Math.max((-step * i), -maxPosition)
            privates.sel.itemWrap.style.transform = `translateX(${privates.opt.position}px)`
            return
          }
        }
      }


      privates.touchSet = (e) => {
        xDown = e.touches[0].clientX;
        yDown = e.touches[0].clientY;
      }

      privates.touchMove = (e) => {
        if ( ! xDown || ! yDown ) {
          return;
        }

        xUp = e.touches[0].clientX;
        yUp = e.touches[0].clientY;

        xDiff = xDown - xUp;
        yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {

          ( xDiff > 0 ) ? this.nextSlide() : this.prevSlide();

        }

        xDown = 0;
        yDown = 0;
      }


      // Control
      if (privates.sel.prev !== null) {
        privates.sel.prev.addEventListener('click', () => {
          this.prevSlide()
        })
      }

      if (privates.sel.next !== null) {
        privates.sel.next.addEventListener('click', () => {
          this.nextSlide()
        })
      }

      if (privates.sel.ellipses) {
        privates.sel.ellipses.addEventListener('click', (e) => {
          this.goTo(e)
        })
      }

      privates.sel.itemWrap.addEventListener('touchstart', privates.touchSet, {passive: true})
      privates.sel.itemWrap.addEventListener('touchmove', privates.touchMove, {passive: true})

    }

  }

});
