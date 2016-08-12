


$(document).ready(function(){
	
	
	/********** SLIDER 1 - FADE **********/
	$('#slider1 .slider').prrpleSlider({
		transition: 			'fade',
		loop:					false
	});
	
	
	/********** SLIDER 2 - FADE - LOOP **********/
	$('#slider2 .slider').prrpleSlider({
		transition: 			'fade'
	});
	
	
	/********** SLIDER 3 - SLIDE - HORIZONTAL **********/
	$('#slider3 .slider').prrpleSlider({
		loop:					false,
		loopSeamless:			false,
		richSwiping:			false
	});
	
	
	/********** SLIDER 4 - SLIDE - HORIZONTAL - LOOP **********/
	$('#slider4 .slider').prrpleSlider({
		loopSeamless:			false,
		richSwiping:			false
	});
	
	
	/********** SLIDER 5 - SLIDE - HORIZONTAL - LOOP - SEAMLESS **********/
	$('#slider5 .slider').prrpleSlider({
		richSwiping:			false
	});
	
	
	/********** SLIDER 6 - SLIDE - HORIZONTAL - LOOP - SEAMLESS - RICH SWIPING **********/
	$('#slider6 .slider').prrpleSlider();
	
	
	/********** SLIDER 7 - SLIDE - HORIZONTAL - LOOP - SEAMLESS - RICH SWIPING - CSS TRANSFORMS **********/
	$('#slider7 .slider').prrpleSlider({
		csstransforms:			true
	});
	
	
	/********** SLIDER 8 - SLIDE - VERTICAL **********/
	$('#slider8 .slider').prrpleSlider({
		direction:				'vertical',
		loop:					false,
		loopSeamless:			false,
		richSwiping:			false
	});
	
	
	/********** SLIDER 9 - SLIDE - VERTICAL - LOOP **********/
	$('#slider9 .slider').prrpleSlider({
		direction:				'vertical',
		loopSeamless:			false,
		richSwiping:			false
	});
	
	
	/********** SLIDER 10 - SLIDE - VERTICAL - LOOP - SEAMLESS **********/
	$('#slider10 .slider').prrpleSlider({
		direction:				'vertical',
		richSwiping:			false
	});
	
	
	/********** SLIDER 11 - SLIDE - VERTICAL - LOOP - SEAMLESS - RICH SWIPING **********/
	$('#slider11 .slider').prrpleSlider({
		direction:				'vertical'
	});
	
	
	/********** SLIDER 12 - SLIDE - VERTICAL - LOOP - SEAMLESS - RICH SWIPING - CSS TRANSFORMS **********/
	$('#slider12 .slider').prrpleSlider({
		direction:				'vertical',
		csstransforms:			true
	});
	
	
});



