/* global document */

const ready = require('../../js/utils/documentReady.js');

ready(function(){
	
	function cookiesPolicyBar() {
	  // Check cookie
	  if ($.cookie('cookiePolicy') != "active") {
	    $('#cookie-panel').show();
	  }
	  //Assign cookie on click
	  $('#cookie-btn').on('click', function () {
	    $.cookie('cookiePolicy', 'active', {expires: 365});
	    $('#cookie-panel').fadeOut();
	  });
	}

	cookiesPolicyBar();
});
