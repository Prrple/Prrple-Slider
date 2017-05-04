# Prrple Slider

[By Alex Bimpson @ Prrple](http://www.prrple.com)

[View online examples](http://code.prrple.com/slider/)

Prrple Slider is a lightweight jQuery slider, first built partly as a learning excercise, and partly to enable tapping into desired features that weren't easily accessible from other open source sliders at the time. Initially intended only for bespoke internal projects, in 2015 an open source repo was finally started, and the slider has evolved and matured since then.

## Getting Started

Include prrple.slider.js and prrple.slider.css in your document (found in the "src" folder of the repo). You'll also need jQuery, and if you want touch functionality, you'll need the [TouchSwipe plugin](https://github.com/mattbryson/TouchSwipe-Jquery-Plugin).

Then, include the necessary HTML markup. In the latest versions, navigation arrows and dots are automatically generated, but you can use the options to disable this auto-generation and place these in the markup wherever you want within the .slider element.
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

Then, initiate the slider with javascript.
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

There are several methods you can use on an initiated slider...

#### Update
Update the slider by passing in new options.
```js
$('#mySlider').prrpleSliderUpdate(options);
```

#### GoTo
Go to a specific slide. You can also pass skip=true to skip the animation.
```js
$('#mySlider').prrpleSliderGoTo(goTo,skip);
```

#### Left
Slide to the left.
```js
$('#mySlider').prrpleSliderLeft();
```

#### Right
Slide to the right.
```js
$('#mySlider').prrpleSliderRight();
```

#### Pause
Pause an autoplaying slider.
```js
$('#mySlider').prrpleSliderPause();
```

#### Play
Start autoplaying the slider.
```js
$('#mySlider').prrpleSliderPlay();
```

#### Resize
Trigger a slider resize. In the latest versions, this should happen automatically on browser window resize, but it's here in case you need to use it at other times.
```js
$('#mySlider').prrpleSliderResize();
```

#### GetCurrent
Returns the current slide number.
```js
$('#mySlider').prrpleSliderGetCurrent();
```

#### Remove
Completely removes the slider, all bound events and classes, and restores your HTML back to the way it was (hopefully).
```js
$('#mySlider').prrpleSliderRemove();
```

