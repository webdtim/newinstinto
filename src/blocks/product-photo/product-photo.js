/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){
  
  if (!document.querySelector('#product-photo')) {
    return;
  } else {
    // активно только для моб. устройств
    if (window.screen.availWidth > 650) {
      return;
    } else {
      // CARUSEL КАРУСЕЛЬ
      const carusel = document.querySelector('#product-photo')
      const gallery = carusel.querySelector('.product-photo__inner')
      const galItem = carusel.querySelectorAll('.product-photo__img')
      const sliderswitch = document.querySelector('.product-photo__ellips-wrap')
      // создаем элементы переключателя
      createSlide()
      const slide = sliderswitch.querySelectorAll('.product-photo__ellips')
      // получаем размер изображения, чтобы понять насколько сдвинуть карусель
      const width = carusel.clientWidth
      let position = 0
      // разрешение движения
      let moving = false
      let initialPosition = null


      function moveLeft() {
        position += width
        position = Math.min(position, 0)// если position > 0, то position = 0
        gallery.style.transform = `translateX(${position}px)`
      // Присваивaем активный класс      
        for(let i = 0; i < slide.length; i++){
          slide[i].classList.remove('product-photo__ellips--active')
          if(position === - width * i){
            slide[i].classList.add('product-photo__ellips--active')
          }
        }      
      }
      function moveRight() {
        position -= width
        position = Math.max(position, -width * (galItem.length-1))
        gallery.style.transform = `translateX(${position}px)`
      // Присваивaем активный класс      
        for(let i = 0; i < slide.length; i++){
          slide[i].classList.remove('product-photo__ellips--active')
          if(position === - width * i){
            slide[i].classList.add('product-photo__ellips--active')
          }
        }
      }

      function moveChek(e) {
        initialPosition = e.clientX
        moving = true
      }
      // проверяем направление движения
      function moveTrack(e) {
        if(moving){
          const currentPosition = e.pageX
          if ((currentPosition - initialPosition) > 6){
            moveLeft()
            moveStop(e)
          }
          if ((currentPosition - initialPosition) < -6){
            moveRight()
            moveStop(e)
          }
        }
      }
      function moveStop() {
        moving = false
      }

      // создаем переключатели карусели
      function createSlide() {
        for (let i = 0; i < gallery.children.length; i++) {
          sliderswitch.insertAdjacentHTML('beforeend', '<div class="product-photo__ellips"></div>')
        }
        sliderswitch.firstElementChild.classList.add('product-photo__ellips--active')
      }

      function choseSlide(e) {   
      // Удаляем активные классы и переключаем на нужный слайд
        for(let i = 0; i < slide.length; i++){
          slide[i].classList.remove('product-photo__ellips--active')
          if(e.target === slide[i]){
            position = -width * i
            gallery.style.transform = `translateX(${position}px)`
      // присваеваем активныый класс
            slide[i].classList.add('product-photo__ellips--active')
          }
        }
      }
      // Переключаем салйды по времени
      // let timerId = setInterval( () => {moveRight()}, 5000)
      //    setTimeout(() => { clearInterval(timerId) }, 20000 )

      sliderswitch.addEventListener('click', choseSlide)
      carusel.addEventListener('pointerdown', moveChek)
      carusel.addEventListener('pointermove', moveTrack)
      carusel.addEventListener('pointerup', moveStop)
      carusel.addEventListener('pointerleave', moveStop)
    }
  }

});
