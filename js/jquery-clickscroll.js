/*
	jQuery Version:				jQuery 1.3.2
	Plugin Name:				ClickScroller V 1.0
	Plugin by: 					Jeff Waterfall: http://www.threeformed.com
	License:					ClickScroller is licensed under a Creative Commons Attribution 3.0 Unported License
								Read more about this license at --> http://creativecommons.org/licenses/by/3.0/			
*/
(function($) {
    $.fn.clickScroll = function(options) {
    	
    	// setup default settings
    	var defaults = {
    		speed: 				200,
			easing: 			'linear',
			lessBtn:			'#clickscroll-less',
			moreBtn:			'#clickscroll-more',
			btnFadeSpeed:		100,
			autoHideNav:		true,
			horizontal:			false
    	},
    	settings = $.extend({}, defaults, options);
		
		return this.each(function() {
			var obj = $(this);
			// Variables
			var frameHeight = 	obj.innerHeight();
			var listHeight = 	obj.children('ul').innerHeight();
			if(settings.horizontal) { // Get the width and apply it
				var listWidth = 0;
				obj.children('ul').children('li').each(function(i) {
					listWidth += $(this).outerWidth(true);
				});
				obj.children('ul').width(listWidth);
			}
			var itemCount = 	obj.children('ul').children('li').size();
			var itemHeight = 	listHeight / itemCount;
			var steps = 		frameHeight / itemHeight;
			var groupHeight = 	Math.ceil(listHeight / steps);
			var groupWidth = 	Math.ceil(listWidth / steps);
			var step = 			0;
			var targ =			0;
			
			if(settings.autoHideNav) {
				$(settings.lessBtn).hide(); // Hides scroll up/left button
			}
			if(listHeight > frameHeight) {
				obj.show();
			} else {
				if(settings.autoHideNav) {
					$(settings.moreBtn).hide();
				}
			}
			$(settings.moreBtn+','+settings.lessBtn).click(function(){
				return false; // prevents from page jump (event when buttons are disabled)							   
			});
			var scrollMore = function() {
				step++;
				if(settings.horizontal) {
					targ -= groupWidth;
					obj.children('ul').stop(true).animate({'left':targ}, settings.speed, settings.easing);
				} else {
					targ -= groupHeight;
					obj.children('ul').stop(true).animate({'top':targ}, settings.speed, settings.easing);
				}
				
				if(step >= Math.floor(steps)) {
					if(settings.autoHideNav) {
						$(this).fadeOut(settings.btnFadeSpeed);
					}
					$(this).unbind('click', scrollMore);
					$(settings.lessBtn).bind('click', scrollLess);
				} else {
					if(settings.autoHideNav) {
						$(settings.lessBtn).fadeIn(settings.btnFadeSpeed);
					}
					$(this).bind('click', scrollMore);
					$(settings.lessBtn).bind('click', scrollLess);
				}
				return false;
			}
			$(settings.moreBtn).bind('click', scrollMore);
			
			var scrollLess = function() {
				step--;
				if(settings.horizontal) {
					targ += groupWidth;
					obj.children('ul').stop(true).animate({'left':targ}, settings.speed, settings.easing);
				} else {
					targ += groupHeight;
					obj.children('ul').stop(true).animate({'top':targ}, settings.speed, settings.easing);
				}
				
				if(step == 0) {
					if(settings.autoHideNav) {
						$(this).fadeOut(settings.btnFadeSpeed);	
					}
					$(this).unbind('click', scrollLess);
					$(settings.moreBtn).bind('click', scrollMore);
				} else {
					if(settings.autoHideNav) {
						$(settings.moreBtn).fadeIn(settings.btnFadeSpeed);
					}
					$(this).bind('click', scrollLess);
					$(settings.moreBtn).unbind('click', scrollMore);
				}
				return false;
			}
			$(settings.lessBtn).bind('click', scrollLess);
	
		}); // END: return this
		
		// returns the jQuery object to allow for chainability.  
        return this;
    };
})(jQuery);