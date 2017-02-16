/*
* jellify Carousel 1.2
* https://github.com/kineticfaction/jellify
*
* Copyright 2017 Jellymedia
* Released under the MIT license.
*/


var jellify = (function ($) {

	var module = {};

	var element;
	var nextElement;
	var prevElement;
	var numItems;
	var infinate;

	module.init = function(settings) {

		if(typeof settings.element !== "undefined") {
			element = settings.element;
		} else {
			if(typeof console.error == 'Function') {
				console.error('jellify :: Element not set');
			} 
			else if(typeof console.log == 'Function') {
				console.error('jellify :: Element not set');
			} 
			else {
				alert('jellify :: Element not set');
			}
			
			return false;
		}

		if(typeof settings.nextElement !== "undefined") {
			nextElement = settings.nextElement;
		} else {
			nextElement = false;
		}

		if(typeof settings.prevElement !== "undefined") {
			prevElement = settings.prevElement;
		} else {
			prevElement = false;
		}

		if(typeof settings.infinate !== "undefined") {
			infinate = settings.infinate;
		} else {
			infinate = false;
		}

		numItems = element.children().length;

		// Add the css here - saves the need for a seperate styelsheet
		element.wrap('<div class="jellify-wrapper" style="width: 100%; overflow: hidden;"></div>');
		element.css('width', (numItems * 100) + '%');
		element.css('position', 'relative');
		element.children().css('width', 'calc(100% / ' + numItems + ')');
		element.children().css('float', 'left');

		bindEvents();

	};

	module.goto = function(idx) {

		var nudge = parseInt(element.parent('.jellify-wrapper').width());

		element.finish();
		var current = parseInt(element.css('left')) || 0;
		var left = nudge * (0 - idx);
		var max = (0 - numItems) * nudge;

		if(left <= max) {
			left = 0;
		}

		if(left > 0) {
			left = max + nudge;
		}

		element.animate({
			left: left + "px"
		}, 350);

	};

	var bindEvents = function() {

		element.parent('.jellify-wrapper').on('swipeleft', function(e) {
			rotateNext();
		});

		element.parent('.jellify-wrapper').on('swiperight', function(e) {
			rotatePrev();
		});

		if(nextElement !== false) {
			nextElement.on('pointerdown', function(e) {
				rotateNext();
			});
		}

		if(prevElement !== false) {
			prevElement.on('pointerdown', function(e) {
				rotateNext();
			});
		}

	};

	var rotateNext = function() {

		var nudge = parseInt(element.parent('.jellify-wrapper').width());

		element.finish();
		var current = parseInt(element.css('left')) || 0;
		var left = current - nudge;
		var max = (0 - numItems) * nudge;


		if(infinate) {
			if(left <= max) {
				left = 0;
			}	
		} else {
			if(left <= max) {
				left = current;
			}
		}
		

		element.animate({
			left: left + "px"
		}, 350);

	};

	var rotatePrev = function() {

		var nudge = parseInt(element.parent('.jellify-wrapper').width());

		element.finish();
		var current = parseInt(element.css('left')) || 0;
		var left = current + nudge;
		var max = (0 - numItems) * nudge;

		if(infinate) {
			if(left > 0) {
				left = max + nudge;
			}
		} else {
			if(left > 0) {
				left = current;
			}
		}

		element.animate({
			left: left + "px"
		}, 350);

	};

	return module;

})(jQuery);
