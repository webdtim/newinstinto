/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){
  
  const header = document.querySelector('#page-header');

  if (header) {

    let scrollPrev = 0;

    function hideHeader() {
      if (window.pageYOffset < scrollPrev) {
        header.classList.remove('page-header--out');
        scrollPrev = window.pageYOffset;
      } else if (window.pageYOffset > scrollPrev + 150) {
        header.classList.add('page-header--out');
        scrollPrev = window.pageYOffset;
      }
    }    

    window.addEventListener('scroll', hideHeader)
  }

  const headerCatalog = document.querySelector('.header-catalog');

  if (headerCatalog) {

    let openCatalogGroup = function(e) {
      if (e.target.classList.contains('header-catalog__angle-down')) {
        const categoryWrap = e.target.closest('.header-catalog__group')
        categoryWrap.querySelector('.header-catalog__angle-down').classList.toggle('header-catalog__angle-down--active')
        categoryWrap.querySelector('.header-catalog__item-wrap').classList.toggle('header-catalog__item-wrap--open')
      }
    }

    const btnsToggle = headerCatalog.querySelectorAll('.header-catalog__angle-down')

    for (let i = 0; i < btnsToggle.length; i ++) {
      btnsToggle[i].addEventListener('click', openCatalogGroup)
    }
  }

});
