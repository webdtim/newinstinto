/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){

  var searchs = document.querySelectorAll('.search');

  for (var i = 0; i < searchs.length; i++) {
    var search = searchs[i];
    search.addEventListener('click', showsearchTarget);
  }

  function showsearchTarget() {
    var targetId = this.getAttribute('data-target-id');
    var targetClassToggle = this.getAttribute('data-target-class-toggle');
    if (targetId && targetClassToggle) {
      this.classList.toggle('search--close');
      document.getElementById(targetId).classList.toggle(targetClassToggle);
    }
  }

});
