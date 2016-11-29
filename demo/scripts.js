


$(document).ready(function(){
	
	
	/********** SLIDER F1 - FADE **********/
	$('#sliderf1 .slider').prrpleSlider({
		transition: 			'fade',
		loop:					false
	});
	
	
	/********** SLIDER F2 - FADE - LOOP **********/
	$('#sliderf2 .slider').prrpleSlider({
		transition: 			'fade'
	});
	
	
	/********** SLIDER H1 - SLIDE - HORIZONTAL **********/
	$('#sliderh1 .slider').prrpleSlider({
		loop:					false,
		loopSeamless:			false,
		richSwiping:			false
	});
	
	
	/********** SLIDER H2 - SLIDE - HORIZONTAL - LOOP **********/
	$('#sliderh2 .slider').prrpleSlider({
		loopSeamless:			false,
		richSwiping:			false
	});
	
	
	/********** SLIDER H3 - SLIDE - HORIZONTAL - LOOP - SEAMLESS **********/
	$('#sliderh3 .slider').prrpleSlider({
		richSwiping:			false
	});
	
	
	/********** SLIDER H4 - SLIDE - HORIZONTAL - LOOP - SEAMLESS - RICH SWIPING **********/
	$('#sliderh4 .slider').prrpleSlider();
	
	
	/********** SLIDER H5 - SLIDE - HORIZONTAL - LOOP - SEAMLESS - RICH SWIPING - CSS TRANSFORMS **********/
	$('#sliderh5 .slider').prrpleSlider({
		csstransforms:			true
	});
	
	
	/********** SLIDER H6 - MULTIPLE **********/
	$('#sliderh6 .slider').prrpleSlider({
		multiple:4,
		transitionTime:250
	});
	
	
	/********** SLIDER V1 - SLIDE - VERTICAL **********/
	$('#sliderv1 .slider').prrpleSlider({
		direction:				'vertical',
		loop:					false,
		loopSeamless:			false,
		richSwiping:			false
	});
	
	
	/********** SLIDER V2 - SLIDE - VERTICAL - LOOP **********/
	$('#sliderv2 .slider').prrpleSlider({
		direction:				'vertical',
		loopSeamless:			false,
		richSwiping:			false
	});
	
	
	/********** SLIDER V3 - SLIDE - VERTICAL - LOOP - SEAMLESS **********/
	$('#sliderv3 .slider').prrpleSlider({
		direction:				'vertical',
		richSwiping:			false
	});
	
	
	/********** SLIDER V4 - SLIDE - VERTICAL - LOOP - SEAMLESS - RICH SWIPING **********/
	$('#sliderv4 .slider').prrpleSlider({
		direction:				'vertical'
	});
	
	
	/********** SLIDER V5 - SLIDE - VERTICAL - LOOP - SEAMLESS - RICH SWIPING - CSS TRANSFORMS **********/
	$('#sliderv5 .slider').prrpleSlider({
		direction:				'vertical',
		csstransforms:			true
	});
	
	
	/********** SLIDER V6 - MULTIPLE **********/
	$('#sliderv6 .slider').prrpleSlider({
		direction:				'vertical',
		multiple:3,
		transitionTime:250
	});
	
	
});



