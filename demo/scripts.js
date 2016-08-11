


$(document).ready(function(){
	
	
	/********** SLIDER 1 - FADE **********/
	$('#slider1 .slider').prrpleSlider();
	
	
	/********** SLIDER 2 - FADE - LOOP **********/
	$('#slider2 .slider').prrpleSlider({
		loop:					true
	});
	
	
	/********** SLIDER 3 - SLIDE - HORIZONTAL **********/
	$('#slider3 .slider').prrpleSlider({
		transition: 			'slide'
	});
	
	
	/********** SLIDER 4 - SLIDE - HORIZONTAL - LOOP **********/
	$('#slider4 .slider').prrpleSlider({
		transition: 			'slide',
		loop:					true,
		loopSeamless:			false
	});
	
	
	/********** SLIDER 5 - SLIDE - HORIZONTAL - LOOP - SEAMLESS **********/
	$('#slider5 .slider').prrpleSlider({
		transition: 			'slide',
		loop:					true,
		loopSeamless:			true
	});
	
	
	/********** SLIDER 6 - SLIDE - HORIZONTAL - LOOP - SEAMLESS - RICH SWIPING **********/
	$('#slider6 .slider').prrpleSlider({
		transition: 			'slide',
		loop:					true,
		loopSeamless:			true,
		richSwiping:			true
	});
	
	
	/********** SLIDER 7 - SLIDE - HORIZONTAL - LOOP - SEAMLESS - RICH SWIPING - CSS TRANSFORMS **********/
	$('#slider7 .slider').prrpleSlider({
		transition: 			'slide',
		loop:					true,
		loopSeamless:			true,
		richSwiping:			true,
		csstransforms:			true
	});
	
	
	/********** SLIDER 8 - SLIDE - VERTICAL **********/
	$('#slider8 .slider').prrpleSlider({
		direction:				'vertical',
		transition: 			'slide'
	});
	
	
	/********** SLIDER 9 - SLIDE - VERTICAL - LOOP **********/
	$('#slider9 .slider').prrpleSlider({
		direction:				'vertical',
		transition: 			'slide',
		loop:					true,
		loopSeamless:			false
	});
	
	
	/********** SLIDER 10 - SLIDE - VERTICAL - LOOP - SEAMLESS **********/
	$('#slider10 .slider').prrpleSlider({
		direction:				'vertical',
		transition: 			'slide',
		loop:					true,
		loopSeamless:			true
	});
	
	
	/********** SLIDER 11 - SLIDE - VERTICAL - LOOP - SEAMLESS - RICH SWIPING **********/
	$('#slider11 .slider').prrpleSlider({
		direction:				'vertical',
		transition: 			'slide',
		loop:					true,
		loopSeamless:			true,
		richSwiping:			true
	});
	
	
	/********** SLIDER 12 - SLIDE - VERTICAL - LOOP - SEAMLESS - RICH SWIPING - CSS TRANSFORMS **********/
	$('#slider12 .slider').prrpleSlider({
		direction:				'vertical',
		transition: 			'slide',
		loop:					true,
		loopSeamless:			true,
		richSwiping:			true,
		csstransforms:			true
	});
	
	
});



