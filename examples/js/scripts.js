


$(document).ready(function(){
  
  
  /********** DEFAULT **********/
  $('#slider0 .slider').prrpleSlider();
  
  
  /********** EXAMPLE #1 - F1 - FADE **********/
  $('#sliderf1 .slider').prrpleSlider({
    transition: 			'fade',
    loop:					false
  });
  
  
  /********** EXAMPLE #2 - F2 - FADE + LOOP **********/
  $('#sliderf2 .slider').prrpleSlider({
    transition: 			'fade'
  });
  
  
  /********** EXAMPLE #3 - H1 - HORIZONTAL SLIDE **********/
  $('#sliderh1 .slider').prrpleSlider({
    loop:					false,
    csstransforms:			false,
    richSwiping:			false
  });
  
  
  /********** EXAMPLE #4 - H2 - HORIZONTAL SLIDE + LOOP **********/
  $('#sliderh2 .slider').prrpleSlider({
    loopSeamless:			false,
    csstransforms:			false,
    richSwiping:			false
  });
  
  
  /********** EXAMPLE #5 - H3 - HORIZONTAL SLIDE + LOOP + SEAMLESS **********/
  $('#sliderh3 .slider').prrpleSlider({
    csstransforms:			false,
    richSwiping:			false
  });
  
  
  /********** EXAMPLE #6 - H4 - HORIZONTAL SLIDE + LOOP + SEAMLESS + RICH SWIPING **********/
  $('#sliderh4 .slider').prrpleSlider({
    csstransforms:			false
  });
  
  
  /********** EXAMPLE #7 - H5 - HORIZONTAL SLIDE + LOOP + SEAMLESS + RICH SWIPING + CSS TRANSFORMS **********/
  $('#sliderh5 .slider').prrpleSlider();
  
  
  /********** EXAMPLE #8 - H6 - HORIZONTAL SLIDE + MULTIPLE SLDIES **********/
  $('#sliderh6 .slider').prrpleSlider({
    multiple:4,
    transitionTime:250
  });
  
  
  /********** EXAMPLE #9 - V1 - VERTICAL SLIDE **********/
  $('#sliderv1 .slider').prrpleSlider({
    direction:				'vertical',
    loop:					false,
    loopSeamless:			false,
    csstransforms:			false,
    richSwiping:			false
  });
  
  
  /********** EXAMPLE #10 - V2 - VERTICAL SLIDE + LOOP **********/
  $('#sliderv2 .slider').prrpleSlider({
    direction:				'vertical',
    loopSeamless:			false,
    csstransforms:			false,
    richSwiping:			false
  });
  
  
  /********** EXAMPLE #11 - V3 - VERTICAL SLIDE + LOOP + SEAMLESS **********/
  $('#sliderv3 .slider').prrpleSlider({
    direction:				'vertical',
    csstransforms:			false,
    richSwiping:			false
  });
  
  
  /********** EXAMPLE #12 - V4 - VERTICAL SLIDE + LOOP + SEAMLESS + RICH SWIPING **********/
  $('#sliderv4 .slider').prrpleSlider({
    direction:				'vertical',
    csstransforms:			false
  });
  
  
  /********** EXAMPLE #13 - V5 - VERTICAL SLIDE + LOOP + SEAMLESS + RICH SWIPING + CSS TRANSFORMS **********/
  $('#sliderv5 .slider').prrpleSlider({
    direction:				'vertical'
  });
  
  
  /********** EXAMPLE #14 - V6 - VERTICAL SLIDE + MULTIPLE **********/
  $('#sliderv6 .slider').prrpleSlider({
    direction:				'vertical',
    multiple:3,
    transitionTime:250
  });
  
  
});


