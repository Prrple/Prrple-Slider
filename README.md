# Prrple Slider

[View online examples](http://code.prrple.com/slider/)

Prrple Slider is a lightweight jQuery slider, first built partly as a learning excercise, and partly to enable tapping into desired features that weren't easily accessible from other open source sliders at the time. Initially intended only for bespoke internal projects, in 2015 an open source repo was finally started, and the slider has evolved and matured since then.

## Getting Started

Include prrple.slider.js and prrple.slider.css in your document (found in the "src" folder of the repo). You'll also need jQuery, and if you want touch functionality, you'll need the [TouchSwipe plugin](https://github.com/mattbryson/TouchSwipe-Jquery-Plugin).

Then, include the necessary HTML markup. In the latest versions, navigation arrows and dots are automatically generated, but you use the options to disable this auto-generation and place these in the markup wherever you want (within the .slider div).
```html
<div id="mySlider" class="slider">
	<div class="slider_area">
		<div class="slides">
			<div class="slide">
				Slide 1
			</div>
			<div class="slide">
				Slide 2
			</div>
			<div class="slide">
				Slide 3
			</div>
			<div class="slide">
				Slide 4
			</div>
		</div>
	</div>
</div>
```

Finally, initiate the slider with javascript.
```js
$('#mySlider').prrpleSlider();
```

You can pass in any options when initiating. For a full list of up-to-date options, and their default values, check inside the latest prrple.slider.js file.
```js
$('#mySlider').prrpleSlider({
    transition: 'slide',
	transitionTime: 500,
	autoPlay: true,
	callback: function(){}
});
```

## Methods

There are several methods you can call on an initiated slider.

**$('#mySlider').prrpleSliderUpdate(options);**
Update the slider by passing in new options.

**$('#mySlider').prrpleSliderGoTo(goTo,skip);**
Go to a specific slide. You can also pass skip=true to skip the animation.

**$('#mySlider').prrpleSliderLeft();**
Slide to the left.

**$('#mySlider').prrpleSliderRight();**
Slide to the right.

**$('#mySlider').prrpleSliderPause();**
Pause an autoplaying slider.

**$('#mySlider').prrpleSliderPlay();**
Start autoplaying the slider.

**$('#mySlider').prrpleSliderResize();**
Trigger a slider resize. In the latest versions, this should happen automatically, but you may still want to use this at other times.

**$('#mySlider').prrpleSliderRemove();**
Completely removes the slider, all bound events and classes, and restores your HTML back to the way it was (hopefully).

**$('#mySlider').prrpleSliderGetCurrent();**
Returns the current slide number.

