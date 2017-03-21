(function ($, root, undefined) {
	
	$(function () {
		
		'use strict';
		
		document.querySelector(".mo-nav-opener").onclick = function() {
      document.querySelector("body").classList.toggle('menu-active');
    }
		
	});
	
})(jQuery, this);
