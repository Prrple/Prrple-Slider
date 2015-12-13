


$(document).ready(function(){
	
	
	/********** SLIDER 1 - FADE **********/
	$('#slider1 .slider').prrpleSlider({
		windowsize:				true
	});
	$('#slider1 .slider').swipe({
		swipeLeft:function(){
			$('#slider1 .slider').prrpleSliderRight();
		},
		swipeRight:function(){
			$('#slider1 .slider').prrpleSliderLeft();
		},
		threshold:100,
		allowPageScroll:'vertical',
		excludedElements: ''
	});
	
	
	/********** SLIDER 2 - FADE - LOOP **********/
	$('#slider2 .slider').prrpleSlider({
		windowsize:				true,
		loop:					true,
	});
	$('#slider2 .slider').swipe({
		swipeLeft:function(){
			$('#slider2 .slider').prrpleSliderRight();
		},
		swipeRight:function(){
			$('#slider2 .slider').prrpleSliderLeft();
		},
		threshold:100,
		allowPageScroll:'vertical',
		excludedElements: ''
	});
	
	
	/********** SLIDER 3 - SLIDE - HORIZONTAL **********/
	$('#slider3 .slider').prrpleSlider({
		windowsize:				true,
		transition: 			'slide'
	});
	$('#slider3 .slider').swipe({
		swipeLeft:function(){
			$('#slider3 .slider').prrpleSliderRight();
		},
		swipeRight:function(){
			$('#slider3 .slider').prrpleSliderLeft();
		},
		threshold:100,
		allowPageScroll:'vertical',
		excludedElements: ''
	});
	
	
	/********** SLIDER 4 - SLIDE - HORIZONTAL - LOOP **********/
	$('#slider4 .slider').prrpleSlider({
		windowsize:				true,
		transition: 			'slide',
		loop:					true,
		loopSeamless:			false
	});
	$('#slider4 .slider').swipe({
		swipeLeft:function(){
			$('#slider4 .slider').prrpleSliderRight();
		},
		swipeRight:function(){
			$('#slider4 .slider').prrpleSliderLeft();
		},
		threshold:100,
		allowPageScroll:'vertical',
		excludedElements: ''
	});
	
	
	/********** SLIDER 5 - SLIDE - HORIZONTAL - LOOP - SEAMLESS **********/
	$('#slider5 .slider').prrpleSlider({
		windowsize:				true,
		transition: 			'slide',
		loop:					true,
		loopSeamless:			true
	});
	$('#slider5 .slider').swipe({
		swipeLeft:function(){
			$('#slider5 .slider').prrpleSliderRight();
		},
		swipeRight:function(){
			$('#slider5 .slider').prrpleSliderLeft();
		},
		threshold:100,
		allowPageScroll:'vertical',
		excludedElements: ''
	});
	
	
	/********** SLIDER 6 - SLIDE - HORIZONTAL - LOOP - SEAMLESS - RICH SWIPING **********/
	$('#slider6 .slider').prrpleSlider({
		windowsize:				true,
		transition: 			'slide',
		loop:					true,
		loopSeamless:			true
	});
	$('#slider6 .slider').swipe({
		swipeStatus: function swipeStatus(event,phase,direction,distance){
			$('#slider6 .slider').prrpleSliderSwipe(event,phase,direction,distance,'horizontal')
		},
		threshold:100,
		allowPageScroll:'vertical',
		excludedElements: ''
	});
	
	
	/********** SLIDER 7 - SLIDE - HORIZONTAL - LOOP - SEAMLESS - RICH SWIPING **********/
	$('#slider7 .slider').prrpleSlider({
		windowsize:				true,
		transition: 			'slide',
		loop:					true,
		loopSeamless:			true,
		csstransforms:			true
	});
	$('#slider7 .slider').swipe({
		swipeStatus: function swipeStatus(event,phase,direction,distance){
			$('#slider7 .slider').prrpleSliderSwipe(event,phase,direction,distance,'horizontal')
		},
		threshold:100,
		allowPageScroll:'vertical',
		excludedElements: ''
	});
	
	
	/********** SLIDER 8 - SLIDE - VERTICAL **********/
	$('#slider8 .slider').prrpleSlider({
		windowsize:				true,
		direction:				'vertical',
		transition: 			'slide'
	});
	$('#slider8 .slider').swipe({
		swipeUp:function(){
			$('#slider8 .slider').prrpleSliderRight();
		},
		swipeDown:function(){
			$('#slider8 .slider').prrpleSliderLeft();
		},
		threshold:100,
		allowPageScroll:'vertical',
		excludedElements: ''
	});
	
	
	/********** SLIDER 9 - SLIDE - VERTICAL - LOOP **********/
	$('#slider9 .slider').prrpleSlider({
		windowsize:				true,
		direction:				'vertical',
		transition: 			'slide',
		loop:					true,
		loopSeamless:			false
	});
	$('#slider9 .slider').swipe({
		swipeUp:function(){
			$('#slider9 .slider').prrpleSliderRight();
		},
		swipeDown:function(){
			$('#slider9 .slider').prrpleSliderLeft();
		},
		threshold:100,
		allowPageScroll:'vertical',
		excludedElements: ''
	});
	
	
	/********** SLIDER 10 - SLIDE - VERTICAL - LOOP - SEAMLESS **********/
	$('#slider10 .slider').prrpleSlider({
		windowsize:				true,
		direction:				'vertical',
		transition: 			'slide',
		loop:					true,
		loopSeamless:			true
	});
	$('#slider10 .slider').swipe({
		swipeUp:function(){
			$('#slider10 .slider').prrpleSliderRight();
		},
		swipeDown:function(){
			$('#slider10 .slider').prrpleSliderLeft();
		},
		threshold:100,
		allowPageScroll:'vertical',
		excludedElements: ''
	});
	
	
	/********** SLIDER 11 - SLIDE - VERTICAL - LOOP - SEAMLESS - RICH SWIPING **********/
	$('#slider11 .slider').prrpleSlider({
		windowsize:				true,
		direction:				'vertical',
		transition: 			'slide',
		loop:					true,
		loopSeamless:			true
	});
	$('#slider11 .slider').swipe({
		swipeStatus: function swipeStatus(event,phase,direction,distance){
			$('#slider11 .slider').prrpleSliderSwipe(event,phase,direction,distance,'vertical')
		},
		threshold:100,
		allowPageScroll:'vertical',
		excludedElements: ''
	});
	
	
	/********** SLIDER 12 - SLIDE - VERTICAL - LOOP - SEAMLESS - RICH SWIPING **********/
	$('#slider12 .slider').prrpleSlider({
		windowsize:				true,
		direction:				'vertical',
		transition: 			'slide',
		loop:					true,
		loopSeamless:			true,
		csstransforms:			true
	});
	$('#slider12 .slider').swipe({
		swipeStatus: function swipeStatus(event,phase,direction,distance){
			$('#slider12 .slider').prrpleSliderSwipe(event,phase,direction,distance,'vertical')
		},
		threshold:100,
		allowPageScroll:'vertical',
		excludedElements: ''
	});
	
	
});


var resize;
$(window).resize(function(){
	clearTimeout(resize);
	resize = setTimeout(function(){
		$('.slider').each(function(){
			$(this).prrpleSliderResize();
		});
	},100);
});



