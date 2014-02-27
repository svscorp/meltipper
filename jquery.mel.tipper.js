/*
 * MEL.Tipper v1.3.0 (jQuery Plugin)
 * 
 * http://melnaron.net/projects/meltipper
 * 
 * Copyright (c) 2009 Dmitry "Melnaron" Gureev
 * 
 * Date: 2009-02-22 18:49:16
 */

(function() {
	
	if (! jQuery.mel) {
		jQuery.mel = {};
	}
	
	jQuery.mel.tipper = {
		
		/**
		 * Tipper settings
		 */
		showDelay: 		400,
		showSpeed: 		200,
		followMouse: 	true,
		tipStyle: {
			border:		'1px solid #333333',
			background:	'#FFFFCC',
			font:		'11px Tahoma',
			color:		'#333333',
			padding:	'5px',
			maxWidth:	'200px',
			opacity:	'0.9'
		},
		
		/**
		 * This function shows a tooltip in x,y position
		 * @param {Object} tip
		 * @param {Object} x
		 * @param {Object} y
		 */
		show: function(tip, x, y, move) {
			this.tip = tip;
			this.x = x;
			this.y = y;
			
			if (! move && ! this.shows && ! this.showDelay) {
				this.shows = true;
			}
			
			if (! move && ! this.shows && this.showDelay) {
				if (! this.timer) {
					this.timer = setTimeout(function() {
						$.mel.tipper.shows = true;
						$.mel.tipper.show($.mel.tipper.tip, $.mel.tipper.x, $.mel.tipper.y);
					}, this.showDelay);
				}
				return;
			}
			
			if (move && (! this.shows || ! this.followMouse)) {
				return;
			}
			
			if (tip) {
				var t   = this.o;
				var ox  = 16;
				var oy  = 16;
				var twp = parseInt(t.css('padding-left')) + parseInt(t.css('padding-right'));
				var twb = parseInt(t.css('border-left-width')) + parseInt(t.css('border-right-width'));
				var thp = parseInt(t.css('padding-top')) + parseInt(t.css('padding-bottom'));
				var thb = parseInt(t.css('border-top-width')) + parseInt(t.css('border-bottom-width'));
				
				if ($.browser.msie) {
					t.html(tip).fadeIn(this.showSpeed).css({width: ''});
					var tw  = t.width();
					var twm = parseInt(t.css('max-width'));
					if (tw > twm) {
						t.css('width', twm);
						tw = twm + twp + twb;
					} else {
						tw = tw + twp + twb;
					}
				} else {
					t.html(tip).fadeIn(this.showSpeed);
					var tw  = t.width() + twp + twb;
				}
				
				var th  = t.height() + thp + thb;
				
				x = (x + tw + ox > $(document).width()) ? x = x - tw - (ox/2) + 'px' : x = x + ox + 'px';
				y = (y + th + oy > $(document).height()) ? y = y - th - (oy/2) + 'px' : y = y + oy + 'px';
				
				t.css({left: x, top: y});
			}
		},
		
		/**
		 * This function hides a tooltip
		 */
		hide: function() {
			clearTimeout(this.timer);
			this.timer = false;
			this.shows = false;
			this.o.hide();
		},
		
		/**
		 * This function inits general events to showing tooltips
		 */
		init: function() {
			$('*[tip]')
				.live('mouseover', function(e) {
					$.mel.tipper.show($(this).attr('tip'), e.pageX, e.pageY);
				})
				.live('mousemove', function(e) {
					$.mel.tipper.show($(this).attr('tip'), e.pageX, e.pageY, true);
				})
				.live('mouseout', function() {
					$.mel.tipper.hide();
				})
				.live('click', function() {
					$.mel.tipper.hide();
				})
			;
			
			var style = this.tipStyle;
			
			style.display  = 'none';
			style.position = 'absolute';
			style.zIndex   = '999999';
			
			this.o = $('<div id="mel-tipper"></div>')
				.css(style)
				.bind('mouseover', function() { $.mel.tipper.hide(); })
				.appendTo('body')
			;
		},
		
		/**
		 * This function apply a new stile to a tooltip
		 * @param {Object} style
		 */
		style: function(s) {
			this.o.css(s);
		}
		
	};
	
	jQuery(document).ready(function() {
		
		$.mel.tipper.init();
		
	});
	
})();