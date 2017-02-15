/*
* jellyfy Carousel 1.0
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

	module.init = function(settings) {

		element = settings.element;
		nextElement = settings.nextElement;
		prevElement = settings.prevElement;

		numItems = element.children().length;

		// Add the css here - saves the need for a seperate styelsheet
		element.wrap('<div class="jellify-wrapper" style="width: 100%; overflow: hidden;"></div>');
		element.css('width', (numItems * 100) + '%');
		element.css('position', 'relative');
		element.children().css('width', 'calc(100% / ' + numItems + ')');
		element.children().css('float', 'left');

		bindEvents();

	};

	var bindEvents = function() {
		element.parent('.jellify-wrapper').on('swipeleft', function(e) {
			rotateNext();
		});

		element.parent('.jellify-wrapper').on('swiperight', function(e) {
			rotatePrev();
		});

		nextElement.on('pointerdown', function(e) {
			rotateNext();
		});

		prevElement.on('pointerdown', function(e) {
			rotatePrev();
		});
	}

	var rotateNext = function() {

		var nudge = parseInt(element.parent('.jellify-wrapper').width());

		element.finish();
		var current = parseInt(element.css('left')) || 0;
		var left = current - nudge;
		var max = (0 - numItems) * nudge;

		if(left <= max) {
			left = 0;
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

		if(left > 0) {
			left = max + nudge;
		}

		element.animate({
			left: left + "px"
		}, 350);

	};

	return module;

})(jQuery);
