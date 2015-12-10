


$(document).ready(function(){
	
	
	/********** SLIDER 1 - FADE **********/
	$('#slider1 .slider').prrpleSlider();
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
	
	
	/********** SLIDER 3 - SLIDE **********/
	$('#slider3 .slider').prrpleSlider({
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
	
	
	/********** SLIDER 4 - SLIDE - LOOP **********/
	$('#slider4 .slider').prrpleSlider({
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
	
	
	/********** SLIDER 5 - SLIDE - LOOP - SEAMLESS **********/
	$('#slider5 .slider').prrpleSlider({
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
	
	
	/********** SLIDER 6 - SLIDE - LOOP - SEAMLESS **********/
	$('#slider6 .slider').prrpleSlider({
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
	
	
	/********** SLIDER 7 - SLIDE - LOOP - SEAMLESS **********/
	$('#slider7 .slider').prrpleSlider({
		transition: 			'slide',
		loop:					true,
		loopSeamless:			true,
		csstransforms:			true
	});
	$('#slider7 .slider').swipe({
		swipeLeft:function(){
			$('#slider7 .slider').prrpleSliderRight();
		},
		swipeRight:function(){
			$('#slider7 .slider').prrpleSliderLeft();
		},
		threshold:100,
		allowPageScroll:'vertical',
		excludedElements: ''
	});
	
	
	
	
	
	/*
	$('#slider1 .slider').prrpleSlider({
		transition: 			'slide',
		transitionTime:			400,
		direction:				'horizontal',
		loop:					false,
		loopSeamless:			false,
		csstransforms:			false
	});
	*/
	
	/*
	$('#slider1 .slider').swipe({
		swipeStatus: function swipeStatus(event,phase,direction,distance){
			$('#slider1 .slider').prrpleSliderSwipe(event,phase,direction,distance,'horizontal')
		},
		/*swipeLeft:function(){
			$('#slider1 .slider').prrpleSliderRight();
		},
		swipeRight:function(){
			$('#slider1 .slider').prrpleSliderLeft();
		},*/
		/*threshold:100,
		allowPageScroll:'vertical',
		excludedElements: ''
	});
	*/
	
	
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