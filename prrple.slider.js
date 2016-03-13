


/*

	AUTHOR:		Alex Bimpson
	NAME:		Prrple Slider
	WEB:		www.prrple.com
	REQUIRES:	jQuery, jQuery Easing, jQuery TouchSwipe
	VERSION:	1.24
	UPDATED:	2016-03-13

*/



/************************************************************************************************************/
/********************************************** PRRPLE - SLIDER *********************************************/
/************************************************************************************************************/


(function($){
	
	
	/******************** CONFIG ********************/
	$.prrpleSliderConfig = $.prrpleSliderConfig || {
		//ELEMENTS
		el_slider_area:		'.slider_area',		//define slider area element
		el_slides:			'.slides',			//define slides element
		el_slide:			'.slide',			//define slide elements
		el_left:			'.slide_left',		//define left arrow element
		el_right:			'.slide_right',		//define right arrow element
		el_controls:		'.slider_controls',	//define arrow wrapper
		el_play:			'.slider_play',		//define play button
		el_pause:			'.slider_pause',	//define pause button
		el_nav:				'.slider_nav',		//define nav dot wrapper
		el_navdot:			'.slider_navdot',	//define nav dots
		//SIZING
		width:				null,				//define specific width
		height:				null,				//define specific height
		spacing:			0,					//spacing between slides
		//ANIMATION
		direction:			'horizontal',		//horizontal, vertical
		transition:			'fade',				//fade, slide
		transitionTime:		500,				//how long to change slides
		easing: 			'swing',			//requires jquery easing plugin
		loop:				false,				//whether or not to infinitely loop the slider
		loopSeamless:		true,				//whether or not a looping slider should seamlessly rotate
		csstransforms:		false,				//use css transforms?
		//AUTOPLAY
		autoPlay:			false,				//play slider automatically?
		autoPlayInterval:	4000,				//how often to automatically switch between slides
		pauseOnClick:		true,				//pause slider after interacting?
		//MISC
		windowsize:			false,				//resize slider on browser resize
		hideArrows:			true,				//whether to hide arrows if there's only one slide e.g. for dynamically loaded content
		firstSlide:			1,					//the slide number to start on
		callback:			null,				//callback function after a slide changes
		callback_end:		null				//callback function after a slide changes and animation completes
	};
	
	
	/******************** NEW SLIDER ********************/
	$.fn.prrpleSlider = function(params){
		var options = $.extend({}, $.prrpleSliderConfig, params);
		this.each(function(){
			//remove previous slider
			try{
				$(this).data('prrpleSlider').removeSlider();
			}catch(e){};
			//create new slider
			$(this).unbind().data('prrpleSlider', new prrpleSliderCreate($(this), options));
		});
		return this;
	};
	
	
	/******************** UPDATE SLIDER ********************/
	$.fn.prrpleSliderUpdate = function(options){
		try{
			$(this).data('prrpleSlider').update(options);
		}catch(e){};
	};
	$.fn.prrpleSliderGoTo = function(goTo,skip){
		try{
			$(this).data('prrpleSlider').goToSlide(goTo,skip);
		}catch(e){};
	};
	$.fn.prrpleSliderLeft = function(){
		try{
			$(this).data('prrpleSlider').slideLeft();
		}catch(e){};
	};
	$.fn.prrpleSliderRight = function(){
		try{
			$(this).data('prrpleSlider').slideRight();
		}catch(e){};
	};
	$.fn.prrpleSliderPause = function(){
		try{
			$(this).data('prrpleSlider').pauseSlider();
		}catch(e){};
	};
	$.fn.prrpleSliderPlay = function(){
		try{
			$(this).data('prrpleSlider').playSlider();
		}catch(e){};
	};
	$.fn.prrpleSliderSwipe = function(event, phase, direction, distance, orientation, callback){
		try{
			$(this).data('prrpleSlider').swipe(event, phase, direction, distance, orientation, callback);
		}catch(e){};
	};
	$.fn.prrpleSliderResize = function(){
		try{
			$(this).data('prrpleSlider').resizeSlider();
		}catch(e){};
	};
	$.fn.prrpleSliderRemove = function(){
		try{
			$(this).data('prrpleSlider').removeSlider();
			$(this).unbind().data('prrpleSlider',null);
		}catch(e){};
	};
	$.fn.prrpleSliderGetCurrent = function(){
		try{
			return $(this).data('prrpleSlider').getCurrent();
		}catch(e){
			return false;
		};
	};
	
	
	/******************** CREATE SLIDER ********************/
	function prrpleSliderCreate(root,options){
		
		
		var s = {
			
			
			//SLIDER
			slider: root,			//slider element
			el: {},					//slider elements
			width: 0,				//slider width
			height: 0,				//slider height
			
			
			//STATUS
			total: 0,				//total slides
			current: 1,				//current slide
			prev: 1,				//previous slide
			next: 1,				//next slide
			pos_current: 0,			//current slide position
			paused: false,			//is animation paused?
			transforms: false,		//are css transforms enabled?
			cloned: false,			//are there cloned slides? (seamless looping)
			
			
			//INITIALISE
			init: function(){
				//transforms
				s.transforms = (options.csstransforms!=true?false:(typeof(Modernizr)!=='undefined'?Modernizr.csstransforms:false));
				//cloned
				s.cloned = (options.transition=='slide' && options.loop==true && options.loopSeamless==true?true:false);
				//get elements
				s.get_elements();
				//get info
				s.get_info();
				//update slider classes
				s.update_class();
				//get slider dimensions
				s.get_dims();
				//update size & position
				s.update_size();
				//update visibility (when fading)
				s.update_visibility();
				//clone slides (when seamless looping)
				s.add_clones();
				//add nav dots
				s.add_dots();
				//add nav arrows
				s.add_arrows();
				//add nav controls
				s.add_controls();
				//hide relevant arrows
				s.hide_arrows();
				//easing
				if(typeof($.easing[options.easing])==='undefined'){
					options.easing = 'swing';
				};
				//go to initial slide
				if(options.firstSlide!=1){
					s.goTo(options.firstSlide,true);
				}else{
					s.slider.find(options.el_slide+':nth-child(1)').addClass('current');
				};
				//callback
				if(typeof(options.callback)==='function'){
					options.callback(s.current,s.total);
				};
				if(typeof(options.callback_end)==='function'){
					options.callback_end(s.current,s.total);
				};
				//autoplay
				s.autoplay();
				//add inited class
				s.slider.addClass('slider_init');
			},
			
			
			//GET ELEMENTS
			get_elements: function(){
				s.el.slider_area = s.slider.find(options.el_slider_area);
				s.el.slides = s.slider.find(options.el_slides);
				s.el.slide = s.slider.find(options.el_slide);
				s.el.nav = s.slider.find(options.el_nav);
				s.el.left = s.slider.find(options.el_left);
				s.el.right = s.slider.find(options.el_right);
				s.el.controls = s.slider.find(options.el_controls);
				s.el.play = s.slider.find(options.el_play);
				s.el.pause = s.slider.find(options.el_pause);
			},
			
			
			//GET INFO
			get_info: function(){
				s.total = s.slider.find(options.el_slide).length;
			},
			
			
			//UPDATE CLASS
			update_class: function(){
				//transition
				if(options.transition == 'fade'){
					s.slider.addClass('fade');
				}else{
					s.slider.removeClass('fade');
				};
				//direction
				if(options.direction == 'vertical'){
					s.slider.addClass('vertical');
				}else{
					s.slider.removeClass('vertical');
				};
			},
			
			
			//GET DIMENSIONS
			get_dims: function(){
				//reset
				s.slider.removeAttr('style');
				s.el.slider_area.removeAttr('style');
				s.el.slides.removeAttr('style');
				s.el.slide.removeAttr('style');
				s.slider.find(options.el_slide).show();
				//get width
				if(options.width==null){
					s.width = s.el.slider_area.innerWidth();
				}else{
					s.width = options.width;
				};
				//get height
				if(options.height==null){
					if(options.transition == 'fade'){
						s.height = 0;
						s.slider.find(options.el_slide).each(function(){
							var h2 = $(this).height();
							if(h2 > s.height){
								s.height = h2;
							};
						});
					}else{
						s.slider.find(options.el_slide).css({
							width: s.width
						});
						s.el.slides.css({
							width: (s.width * (s.total+2))
						});
						s.height = s.el.slider_area.innerHeight();
						return false;
					};
					var h3 = s.slider.height();
					if(h3 > s.height){
						s.height = h3;
					};
				}else{
					s.height = options.height;
				};
				s.el.slides.removeAttr('style');
				s.slider.find(options.el_slide).removeAttr('style').show();
			},
			
			
			//UPDATE SIZE
			update_size: function(){
				//slider
				if(options.width!=null){
					s.slider.css({
						width: s.width
					});
				};
				if(options.height!=null){
					s.slider.css({
						height: s.height
					});
				};
				//slider_area
				s.el.slider_area.css({
					width: s.width,
					height: s.height
				});
				//slides
				if(options.transition == 'fade'){
					s.el.slides.css({
						width: s.width,
						height: s.height
					});
				}else{
					if(options.direction == 'vertical'){
						if(s.cloned==true){
							var h = s.height * (s.total + 1);
						}else{
							var h = s.height * s.total;
						};
						s.el.slides.css({
							width: s.width,
							height: h
						});
					}else{
						if(s.cloned==true){
							var w = s.width * (s.total + 2);
						}else{
							var w = s.width * s.total;
						};
						s.el.slides.css({
							width: w,
							height: s.height
						});
					};
				};
				//slide
				s.el.slide.css({
					width: s.width,
					height: s.height
				});
			},
			
			
			//UPDATE VISIBILITY
			update_visibility: function(){
				if(options.transition == 'fade'){
					s.slider.find(options.el_slide).hide();
					s.slider.find(options.el_slide+':first').show();
				};
			},
			
			
			//CLONE SLIDES (WHEN SEAMLESSLY LOOPING)
			add_clones: function(){
				if(s.cloned==true && s.slider.find(options.el_slide+'.cloned').length<1){
					var first = s.slider.find(options.el_slide).first();
					var last = s.slider.find(options.el_slide).last();
					first.clone().addClass('cloned').appendTo(s.el.slides);
					//last.clone().addClass('cloned cloned2').prependTo(s.el.slides);
					s.el.slide = s.slider.find(options.el_slide);
				};
			},
			
			
			//ADD DOTS
			add_dots: function(){
				if(s.total <= 1){
					s.el.nav.hide();
				}else{
					s.el.nav.html('');
					for(i=1; i<(s.total+1); i++){
						s.el.nav.append('<a class="slider_navdot '+(i==1?'current':'')+'" id="slider_navdot_'+i+'" >'+i+'</a>');
					};
					s.el.nav.find(options.el_navdot).each(function(){
						$(this).unbind( "click" );
						$(this).click(function(){
							var slideNo = parseInt($(this).attr('id').replace('slider_navdot_',''));
							s.goTo(slideNo);
							return false;
						});
					});
				};
			},
			
			
			//ADD ARROWS
			add_arrows: function(){
				if(s.total <= 1){
					if(options.hideArrows == true){
						$(s.el.left).hide();
						$(s.el.right).hide();
					};
				}else{
					$(s.el.left).show();
					$(s.el.right).show();
					if(s.el.left.length > 0){
						//reset
						s.el.left.removeClass('slide_left_inactive');
						s.el.right.removeClass('slide_right_inactive');
						//right
						$(s.el.right).unbind('click').click(function(){
							s.slide_right();
							return false;
						});
						//left
						$(s.el.left).unbind('click').click(function(){
							s.slide_left();
							return false;
						});
					};
				};
			},
			
			
			//ADD CONTROLS
			add_controls: function(){
				if(s.total <= 1){
					$(s.el.controls).hide();
				}else{
					$(s.el.controls).show();
					$(s.el.play).addClass('hidden');
					$(s.el.pause).removeClass('hidden');
					//pause
					$(s.el.pause).unbind('click').click(function(){
						$(s.el.pause).addClass('hidden');
						$(s.el.play).removeClass('hidden');
						s.paused = true;
						return false;
					});
					//resume
					$(s.el.play).unbind('click').click(function(){
						$(s.el.play).addClass('hidden');
						$(s.el.pause).removeClass('hidden');
						s.paused = false;
						return false;
					});
				};
			},
			
			
			//HIDE RELEVANT ARROWS
			hide_arrows: function(){
				if(options.loop==false && options.firstSlide==1){
					s.el.left.addClass('slide_left_inactive');
				}else if(options.loop==false && options.firstSlide==s.total){
					s.el.right.addClass('slide_right_inactive');
				};
			},
			
			
			//AUTO PLAY INTERVAL
			autoplay_int: null,
			autoplay: function(){
				if(options.autoPlay == true){
					clearInterval(s.autoplay_int);
					s.autoplay_int = setInterval(function(){
						if(s.paused==false){
							s.slide_right(true);
						};
					},options.autoPlayInterval);
				};
			},
			
			
			//GET POSITION - SPECIFIED SLIDE
			get_pos: function(slide,direction){
				var l = (direction=='vertical'?s.height:s.width);
				//var total = (s.cloned==true?slide:slide-1);
				var total = slide-1;
				return '-'+((total * l) + (parseInt(options.spacing) * total))+'px';
			},
			
			//GET POSITION - FIRST SLIDE
			get_pos_first: function(direction){
				if(s.cloned==true){
					//return s.width + (parseInt(options.spacing));
					return '0px';
				}else{
					return '0px';
				};
			},
			
			//GET POSITION - LAST SLIDE
			get_pos_last: function(direction){
				var l = (direction=='vertical'?s.height:s.width);
				//var total = (s.cloned==true?s.total:s.total-1);
				var total = s.total-1;
				return parseInt('-'+((total * l) + (parseInt(options.spacing) * total)));
			},
			
			//GET POSITION - CLONED FIRST SLIDE (AT END)
			get_pos_clone_first: function(direction){
				var l = (direction=='vertical'?s.height:s.width);
				//var total = (s.cloned==true?s.total:s.total-1);
				var total = s.total-1;
				var total2 = total+1;
				return '-'+((total2 * l) + (parseInt(options.spacing) * total))+'px';
			},
			
			//GET POSITION - CLONED LAST SLIDE (AT START)
			get_pos_clone_last: function(direction){
				return '0px';
			},
			
			
			//SLIDE LEFT
			slide_left: function(skip_pause,swiping){
				if(s.total>1 && !s.el.left.hasClass('slide_left_inactive')){
					//go to next slide
					if(s.current > 1){
						s.goTo(s.current-1,false,'left',swiping);
					}else{
						if(options.loop == true){
							s.goTo(s.total,false,'left',swiping);
						};
					};
					//pause autoplay
					if(skip_pause!=true && options.pauseOnClick==true){
						s.paused = true;
					};
				};
			},
			
			
			//SLIDE RIGHT
			slide_right: function(skip_pause,swiping){
				if(s.total>1 && !s.el.right.hasClass('slide_right_inactive')){
					//go to next slide
					if(s.current < s.total){
						s.goTo(s.current+1,false,'right',swiping);
					}else{
						if(options.loop == true){
							s.goTo(1,false,'right',swiping);
						};
					};
					//pause autoplay
					if(skip_pause!=true && options.pauseOnClick==true){
						s.paused = true;
					};
				};
			},
			
			
			//SWIPE
			swipe: function(event, phase, direction, distance, orientation, callback){
				//console.log(phase+' - '+direction+' - '+distance+' - '+orientation);
				if(s.total>1){
					if(phase=='start'){
						//reset position (for seamless swipes)
						if(s.cloned==true && s.current==1){
							//first
							var dist = s.get_pos_first();
						}else if(s.cloned==true && s.current==s.total){
							//last
							var dist = s.get_pos_last();
						};
						if(typeof(dist)!=='undefined'){
							s.pos_current = parseInt(dist);
							if(s.transforms){
								s.el.slides.stop().removeClass('animate').css({
									'-webkit-transform': 'translateX('+dist+')',
									'transform': 'translateX('+dist+')'
								});
							}else{
								s.el.slides.stop().css({
									left:dist
								});
							};
						};
						//callback
						if(typeof(callback) == "function"){
							callback(s.current,s.total,phase,direction,distance);
						};
					}else if(phase=='move'){
						//get distance
						if((orientation=='vertical' && direction=='up') || (orientation!='vertical' && direction=='left')){
							var d = -distance;
						}else if((orientation=='vertical' && direction=='down') || (orientation!='vertical' && direction=='right')){
							var d = distance;
						}else{
							var d = 0;
						};
						var dist = (s.pos_current+d)+'px';
						//set position
						if(orientation=='vertical'){
							if(s.transforms){
								s.el.slides.stop().removeClass('animate').css({
									'-webkit-transform': 'translateY('+dist+')',
									'transform': 'translateY('+dist+')'
								});
							}else{
								s.el.slides.stop().css({
									top: dist
								});
							};
						}else{
							if(s.transforms){
								s.el.slides.stop().removeClass('animate').css({
									'-webkit-transform': 'translateX('+dist+')',
									'transform': 'translateX('+dist+')'
								});
							}else{
								s.el.slides.stop().css({
									left: dist
								});
							};
						};
						//callback
						if(typeof(callback) == "function"){
							callback(s.current,s.total,phase,direction,distance,dist);
						};
					}else if(phase=='end'){
						//go to slide
						if(orientation=='vertical' && direction=="down" && s.current>1){
							s.slide_left(true,true);
						}else if(orientation=='vertical' && direction=="up" && s.current<s.total){
							s.slide_right(true,true);
						}else if(orientation!='vertical' && direction=="right" && (s.current>1 || s.cloned==true)){
							s.slide_left(true,true);
						}else if(orientation!='vertical' && direction=="left" && (s.current<s.total || s.cloned==true)){
							s.slide_right(true,true);
						}else{
							var c = false;
							cancel();
						};
						//callback
						if(c!=false){
							if(typeof(callback) == "function"){
								callback(s.current,s.total,phase,direction,distance);
							};
						};
					}else{
						//cancel
						cancel();
					};
				};
				function cancel(){
					//get distance
					var dist = s.pos_current+'px';
					if(orientation=='vertical'){
						if(s.transforms){
							s.el.slides.stop().addClass('animate').css({
								'-webkit-transform': 'translateY('+dist+')',
								'transform': 'translateY('+dist+')'
							});
						}else{
							s.el.slides.stop().animate({
								top: dist
							},options.transitionTime,options.easing);
						};
					}else{
						if(s.transforms){
							s.el.slides.stop().addClass('animate').css({
								'-webkit-transform': 'translateX('+dist+')',
								'transform': 'translateX('+dist+')'
							});
						}else{
							s.el.slides.stop().animate({
								left: dist
							},options.transitionTime,options.easing);
						};
					};
					//callback
					if(typeof(callback) == "function"){
						callback(s.current,s.total,phase,direction,distance);
					};
				};
			},
			
			
			//GO TO SLIDE
			goTo: function(slideNo,skip,direction,swiping){
				//time
				if(skip==true){
					var time = 0;
				}else{
					var time = options.transitionTime;
				};
				//store previous
				var prev = s.current;
				//save
				var xprev = parseInt(slideNo-1);
				s.current = parseInt(slideNo);
				s.prev = parseInt(slideNo-1);
				s.next = parseInt(slideNo+1);
				if(s.prev<1){
					if(options.loop==true){
						s.prev = s.total;
					}else{
						s.prev = 0;
					};
				};
				if(s.next>s.total){
					if(options.loop==true){
						s.next = 1;
					}else{
						s.next = 0;
					};
				};
				//update nav
				s.el.nav.find(options.el_navdot).removeClass('current');
				s.el.nav.find('#slider_navdot_'+slideNo).addClass('current');
				//animate slider
				if(options.transition == 'fade'){
					//fade
					s.slider.find(options.el_slide).fadeOut(time);
					s.slider.find(options.el_slide+':nth-child('+(slideNo)+')').fadeIn(time);
				}else if(options.transition == 'slide'){
					//slide
					if(options.direction == 'vertical'){
						//vertical - get position
						if(s.cloned==true && s.current==1 && prev==s.total && direction!='left'){
							//seamless slide right
							var dist = s.get_pos_clone_first('vertical');
						}else if(s.cloned==true && s.current==s.total && prev==1 && direction!='right'){
							//seamless slide left
							var dist = s.get_pos(slideNo,'vertical');
							var dist_reset = s.get_pos_clone_first('vertical');
						}else{
							//general slide
							var dist = s.get_pos(slideNo,'vertical');
							if(swiping!=true && direction=='right' && prev==1){
								var dist_reset = s.get_pos_first();
							};
						};
						//vertical - reset
						if(typeof(dist_reset)!=='undefined'){
							if(s.transforms){
								s.el.slides.stop(true,true).removeClass('animate').css({
									'-webkit-transform': 'translateY('+dist_reset+')',
									'transform': 'translateY('+dist_reset+')'
								});
							}else{
								s.el.slides.stop(true,true).css({
									top: dist_reset
								});
							};
						};
						//vertical - animate
						if(s.transforms){
							s.el.slides.stop(true,true).addClass('animate').css({
								'-webkit-transform': 'translateY('+dist+')',
								'transform': 'translateY('+dist+')'
							});
						}else{
							s.el.slides.stop(true,true).animate({
								top:dist
							},time,options.easing);
						};
					}else{
						//horizontal - get positions
						if(s.cloned==true && s.current==1 && prev==s.total && direction!='left'){
							//seamless slide right - animate to cloned first slide
							var dist = s.get_pos_clone_first();
						}else if(s.cloned==true && s.current==s.total && prev==1 && direction!='right' && swiping!=true){
							//seamless slide left - reset to cloned first slide, then animate left
							var dist = s.get_pos(slideNo);
							var dist_reset = s.get_pos_clone_first();
						}else if(s.cloned==true && s.current==s.total && prev==1 && direction!='right' && swiping==true){
							//seamless slide left (swiping)
							var dist = (s.width + (parseInt(options.spacing) * xprev))+'px';
						}else{
							//general slide
							var dist = s.get_pos(slideNo);
							if(swiping!=true && direction=='right' && prev==1){
								var dist_reset = s.get_pos_first;
							};
						};
						//horizontal - reset
						if(typeof(dist_reset)!=='undefined'){
							if(s.transforms){
								s.el.slides.stop(true,true).removeClass('animate').css({
									'-webkit-transform': 'translateX('+dist_reset+')',
									'transform': 'translateX('+dist_reset+')'
								});
							}else{
								s.el.slides.stop(true,true).css({
									left:dist_reset
								});
							};
						};
						//horizontal - animate
						if(s.transforms){
							s.el.slides.stop(true,true).addClass('animate').css({
								'-webkit-transform': 'translateX('+dist+')',
								'transform': 'translateX('+dist+')'
							});
						}else{
							s.el.slides.stop(true,true).animate({
								left:dist
							},time,options.easing);
						};
					};
				};
				//class
				s.slider.find(options.el_slide).removeClass('current prev next');
				s.slider.find(options.el_slide+':nth-child('+(s.current)+')').addClass('current');
				s.slider.find(options.el_slide+':nth-child('+(s.prev)+')').addClass('prev');
				s.slider.find(options.el_slide+':nth-child('+(s.next)+')').addClass('next');
				setTimeout(function(){
					s.slider.find(options.el_slide).removeClass('current2 prev2 next2');
					s.slider.find(options.el_slide+':nth-child('+(s.current)+')').addClass('current2');
					s.slider.find(options.el_slide+':nth-child('+(s.prev)+')').addClass('prev2');
					s.slider.find(options.el_slide+':nth-child('+(s.next)+')').addClass('next2');
				},time);
				//interval
				s.autoplay();
				//arrows
				if(slideNo == 1){
					if(options.loop==false){
						s.el.left.addClass('slide_left_inactive');
					};
				}else{
					s.el.left.removeClass('slide_left_inactive');
				};
				if(slideNo == s.total){
					if(options.loop==false){
						s.el.right.addClass('slide_right_inactive');
					};
				}else{
					s.el.right.removeClass('slide_right_inactive');
				};
				//save current position
				s.pos_current = parseInt(dist);
				//callback
				if(typeof(options.callback)==='function'){
					options.callback(slideNo,s.total);
				};
				setTimeout(function(){
					if(typeof(options.callback_end)==='function'){
						options.callback_end(slideNo,s.total);
					};
				},time);
			},
			
			
			//REMOVE SLIDER
			remove: function(){
				//REMOVE DOTS
				s.el.nav.html('');
				//UNBIND EVENTS
				s.el.left.unbind();
				s.el.right.unbind();
				s.slider.find('*').stop(true,true).unbind().off();
				//CLEAR INTERVAL
				clearInterval(s.autoplay_int);
				//REMOVE CLONE
				s.slider.find(options.el_slide+'.cloned').remove();
				//REMOVE CSS
				s.slider.find('*').removeAttr('style');
				s.slider.removeClass('slider_init fade slide');
			}
			
			
		};
		
		
		//INITIALISE
		s.init();
		
		
		//UPDATE FUNCTIONS
		this.update = function(options2){
			options = $.extend(options, options, options2);
			this.resizeSlider();
		};
		this.goToSlide = function(goTo,skip){
			s.goTo(goTo,skip);
		};
		this.slideLeft = function(){
			s.slide_left();
		};
		this.slideRight = function(){
			s.slide_right();
		};
		this.pauseSlider = function(){
			s.paused = true;
		};
		this.playSlider = function(){
			s.paused = false;
		};
		this.swipe = function(event, phase, direction, distance, orientation, callback){
			s.swipe(event, phase, direction, distance, orientation, callback);
		};
		this.resizeSlider = function(){
			//dimensions
			s.get_dims();
			s.update_size();
			s.update_visibility();
			//go to current
			s.goTo(s.current,true);
		};
		this.removeSlider = function(){
			s.remove();
		};
		this.getCurrent = function(){
			return s.current;
		};
		
		
	};
	
	
})(jQuery);


