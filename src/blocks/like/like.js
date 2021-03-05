/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){
  
  if (document.querySelectorAll('.like')) {

    const likes = document.querySelectorAll('.like');

    let actionLike = function(e) {
      e.target.closest('.like').classList.toggle('like--active');
    } 

    for (let i = 0; i < likes.length; i++) {
      likes[i].addEventListener('click', actionLike);
    }
  }

});
