/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){
  
	const header = document.querySelector('#page-header');
	let scrollPrev = 0;

	window.addEventListener('scroll', function() {
		if (window.pageYOffset < scrollPrev) {
			header.classList.remove('page-header--out');
			scrollPrev = window.pageYOffset;
		} else {
			header.classList.add('page-header--out');
			scrollPrev = window.pageYOffset;
		}

	})

});
