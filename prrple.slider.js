


/*

	AUTHOR:		Alex Bimpson
	NAME:		Prrple Slider
	WEB:		www.prrple.com
	REQUIRES:	jQuery, jQuery TouchSwipe
	VERSION:	1.21
	UPDATED:	2015-12-09

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
		transitionTime:		600,				//how long to change slides
		easing: 			'swing',			//requires jquery easing plugin
		loop:				false,				//whether or not to infinitely loop the slider
		loopSeamless:		true,				//whether or not a looping slider should seamlessly rotate
		csstransforms:		false,				//use css transforms?
		//AUTOPLAY
		autoPlay:			false,				//play slider automatically?
		autoPlayInterval:	4000,				//how often to automatically switch between slides
		pauseOnClick:		true,				//pause slider after interacting?
		//MISC
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
			slider: root,
			div: {},
			width: 0,
			height: 0,
			
			//STATUS
			total: 0,
			current: 1,
			prev: 1,
			next: 1,
			left_current: 0,
			paused: false,
			transforms: false,
			cloned: false,
			
			//INITIALISE
			init: function(){
				//TRANSFORMS
				s.transforms = (options.csstransforms!=true?false:(typeof(Modernizr)!=='undefined'?Modernizr.csstransforms:false));
				//CLONED
				s.cloned = (options.transition=='slide' && options.loop==true && options.loopSeamless==true?true:false);
				//GET DIVS
				s.get_divs();
				//GET INFO
				s.get_info();
				//SLIDER CLASS
				s.update_class();
				//GET DIMS
				s.get_dims();
				//SIZE & POSITION
				s.update_size();
				//VISIBILITY
				s.update_visibility();
				//DUPLICATE SLIDE
				s.add_duplicate();
				//NAV DOTS
				s.add_dots();
				//NAV ARROWS
				s.add_arrows();
				//NAV CONTROLS
				s.add_controls();
				//HIDE RELEVANT ARROWS
				s.hide_arrows();
				//EASING
				if(typeof($.easing[options.easing])==='undefined'){
					options.easing = 'swing';
				};
				//GO TO INITIAL SLIDE
				if(options.firstSlide!=1){
					s.goTo(options.firstSlide,true);
				}else{
					s.slider.find(options.el_slide+':nth-child(1)').addClass('current');
				};
				//CALLBACK
				if(typeof(options.callback)==='function'){
					options.callback(s.current,s.total);
				};
				if(typeof(options.callback_end)==='function'){
					options.callback_end(s.current,s.total);
				};
				//AUTO PLAY INTERVAL
				s.autoplay();
				//ADD CLASS
				s.slider.addClass('slider_init');
			},
			
			//GET DIVS
			get_divs: function(){
				s.div.slider_area = s.slider.find(options.el_slider_area);
				s.div.slides = s.slider.find(options.el_slides);
				s.div.slide = s.slider.find(options.el_slide);
				s.div.nav = s.slider.find(options.el_nav);
				s.div.left = s.slider.find(options.el_left);
				s.div.right = s.slider.find(options.el_right);
				s.div.controls = s.slider.find(options.el_controls);
				s.div.play = s.slider.find(options.el_play);
				s.div.pause = s.slider.find(options.el_pause);
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
			
			//GET DIMS
			get_dims: function(){
				//reset
				s.slider.removeAttr('style');
				s.div.slider_area.removeAttr('style');
				s.div.slides.removeAttr('style');
				s.div.slide.removeAttr('style');
				s.slider.find(options.el_slide).show();
				//get width
				if(options.width==null){
					s.width = s.div.slider_area.innerWidth();
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
						s.div.slides.css({
							width: (s.width * (s.total+2))
						});
						s.height = s.div.slider_area.innerHeight();
						return false;
					};
					var h3 = s.slider.height();
					if(h3 > s.height){
						s.height = h3;
					};
				}else{
					s.height = options.height;
				};
				s.div.slides.removeAttr('style');
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
				s.div.slider_area.css({
					width: s.width,
					height: s.height
				});
				//slides
				if(options.transition == 'fade'){
					s.div.slides.css({
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
						s.div.slides.css({
							width: s.width,
							height: h
						});
					}else{
						if(s.cloned==true){
							var w = s.width * (s.total + 1);
						}else{
							var w = s.width * s.total;
						};
						s.div.slides.css({
							width: w,
							height: s.height
						});
					};
				};
				//slide
				s.div.slide.css({
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
			
			//DUPLICATE SLIDE
			add_duplicate: function(){
				if(s.cloned==true && s.slider.find(options.el_slide+'.cloned').length<1){
					var first = s.slider.find(options.el_slide).first();
					var last = s.slider.find(options.el_slide).last();
					first.clone().addClass('cloned').appendTo(s.div.slides);
					//last.clone().addClass('cloned cloned2').prependTo(s.div.slides);
					s.div.slide = s.slider.find(options.el_slide);
				};
			},
			
			//ADD DOTS
			add_dots: function(){
				if(s.total <= 1){
					s.div.nav.hide();
				}else{
					s.div.nav.html('');
					for(i=1; i<(s.total+1); i++){
						s.div.nav.append('<a class="slider_navdot '+(i==1?'current':'')+'" id="slider_navdot_'+i+'" >'+i+'</a>');
					};
					s.div.nav.find(options.el_navdot).each(function(){
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
						$(s.div.left).hide();
						$(s.div.right).hide();
					};
				}else{
					$(s.div.left).show();
					$(s.div.right).show();
					if(s.div.left.length > 0){
						//reset
						s.div.left.removeClass('slide_left_inactive');
						s.div.right.removeClass('slide_right_inactive');
						//right
						$(s.div.right).unbind('click').click(function(){
							s.slide_right();
							return false;
						});
						//left
						$(s.div.left).unbind('click').click(function(){
							s.slide_left();
							return false;
						});
					};
				};
			},
			
			//ADD CONTROLS
			add_controls: function(){
				if(s.total <= 1){
					$(s.div.controls).hide();
				}else{
					$(s.div.controls).show();
					$(s.div.play).addClass('hidden');
					$(s.div.pause).removeClass('hidden');
					//pause
					$(s.div.pause).unbind('click').click(function(){
						$(s.div.pause).addClass('hidden');
						$(s.div.play).removeClass('hidden');
						s.paused = true;
						return false;
					});
					//resume
					$(s.div.play).unbind('click').click(function(){
						$(s.div.play).addClass('hidden');
						$(s.div.pause).removeClass('hidden');
						s.paused = false;
						return false;
					});
				};
			},
			
			//HIDE RELEVANT ARROWS
			hide_arrows: function(){
				if(options.loop==false && options.firstSlide==1){
					s.div.left.addClass('slide_left_inactive');
				}else if(options.loop==false && options.firstSlide==s.total){
					s.div.right.addClass('slide_right_inactive');
				};
			},
			
			//SLIDE LEFT
			slide_left: function(skip_pause,swiping){
				if(s.total>1 && !s.div.left.hasClass('slide_left_inactive')){
					if(s.current > 1){
						s.goTo(s.current-1,false,'left',swiping)
					}else{
						if(options.loop == true){
							s.goTo(s.total,false,'left',swiping);
						};
					};
					if(skip_pause!=true && options.pauseOnClick==true){
						s.paused = true;
					};
				};
			},
			
			//SLIDE RIGHT
			slide_right: function(skip_pause,swiping){
				if(s.total>1 && !s.div.right.hasClass('slide_right_inactive')){
					if(s.current < s.total){
						s.goTo(s.current+1,false,'right',swiping)
					}else{
						if(options.loop == true){
							s.goTo(1,false,'right',swiping)
						};
					};
					if(skip_pause!=true && options.pauseOnClick==true){
						s.paused = true;
					};
				};
			},
			
			//SWIPE
			swipe: function(event, phase, direction, distance, orientation, callback){
				//console.log(phase+' - '+direction+' - '+distance+' - '+orientation);
				if(phase=='start'){
					//reset position (for seamless swipes)
					if(s.cloned==true && s.current==1){
						//first
						s.left_current = 0;
						if(s.transforms){
							s.div.slides.stop().removeClass('animate').css({
								'-webkit-transform': 'translateX(0px)',
								'transform': 'translateX(0px)'
							});
						}else{
							s.div.slides.stop().css({
								left:0
							});
						};
					}else if(s.cloned==true && s.current==s.total){
						//last
						s.left_current = parseInt('-'+(((s.total-1) * s.width) + (parseInt(options.spacing) * (s.total-1))));
						if(s.transforms){
							s.div.slides.stop().removeClass('animate').css({
								'-webkit-transform': 'translateX('+s.left_current+'px)',
								'transform': 'translateX('+s.left_current+'px)'
							});
						}else{
							s.div.slides.stop().css({
								left:s.left_current
							});
						};
					};
					//callback
					if(typeof(callback) == "function"){
						callback(s.current,s.total,phase,direction,distance);
					};
				}else if(phase=='move'){
					if(orientation=='vertical'){
						//get distance
						if(direction=='up'){
							var d = -distance;
						}else if(direction=='down'){
							var d = distance;
						}else{
							var d = 0;
						};
						//animate
						if(s.transforms){
							s.div.slides.stop().removeClass('animate').css({
								'-webkit-transform': 'translateY('+(s.left_current+d)+'px)',
								'transform': 'translateY('+(s.left_current+d)+'px)'
							});
						}else{
							s.div.slides.stop().css({
								top: (s.left_current+d)
							});
						};
						//callback
						if(typeof(callback) == "function"){
							callback(s.current,s.total,phase,direction,distance,(s.left_current+d));
						};
					}else{
						//get distance
						if(direction=='left'){
							var d = -distance;
						}else if(direction=='right'){
							var d = distance;
						}else{
							var d = 0;
						};
						//animate
						if(s.transforms){
							s.div.slides.stop().removeClass('animate').css({
								'-webkit-transform': 'translateX('+(s.left_current+d)+'px)',
								'transform': 'translateX('+(s.left_current+d)+'px)'
							});
						}else{
							s.div.slides.stop().css({
								left: (s.left_current+d)
							});
						};
						//callback
						if(typeof(callback) == "function"){
							callback(s.current,s.total,phase,direction,distance,(s.left_current+d));
						};
					};
				}else if(phase=='end'){
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
					cancel();
				};
				function cancel(){
					//cancel
					if(orientation=='vertical'){
						if(s.transforms){
							s.div.slides.stop().addClass('animate').css({
								'-webkit-transform': 'translateY('+s.left_current+'px)',
								'transform': 'translateY('+s.left_current+'px)'
							});
						}else{
							s.div.slides.stop().animate({
								top: s.left_current
							},options.transitionTime,options.easing);
						};
					}else{
						if(s.transforms){
							s.div.slides.stop().addClass('animate').css({
								'-webkit-transform': 'translateX('+s.left_current+'px)',
								'transform': 'translateX('+s.left_current+'px)'
							});
						}else{
							s.div.slides.stop().animate({
								left: s.left_current
							},options.transitionTime,options.easing);
						};
					};
					//callback
					if(typeof(callback) == "function"){
						callback(s.current,s.total,phase,direction,distance);
					};
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
				s.div.nav.find(options.el_navdot).removeClass('current');
				s.div.nav.find('#slider_navdot_'+slideNo).addClass('current');
				//animate slider
				if(options.transition == 'fade'){
					//fade
					s.slider.find(options.el_slide).fadeOut(time);
					s.slider.find(options.el_slide+':nth-child('+(slideNo)+')').fadeIn(time);
				}else if(options.transition == 'slide'){
					//slide
					if(options.direction == 'vertical'){
						//vertical
						if(s.cloned==true && s.current==1 && prev==s.total && direction!='left'){
							//seamless slide right
							var dist = '-'+(((s.total) * s.height) + (parseInt(options.spacing) * xprev))+'px';
							if(s.transforms){
								s.div.slides.stop(true).addClass('animate').css({
									'-webkit-transform': 'translateY('+dist+')',
									'transform': 'translateY('+dist+')'
								});
							}else{
								s.div.slides.stop(true).animate({
									top:dist
								},time,options.easing);
							};
						}else if(s.cloned==true && s.current==s.total && prev==1 && direction!='right'){
							//seamless slide left
							var dist = '-'+((xprev * s.height) + (parseInt(options.spacing) * xprev))+'px';
							if(s.transforms){
								s.div.slides.stop(true).removeClass('animate').css({
									'-webkit-transform': 'translateY(-'+(((s.total) * s.height) + (parseInt(options.spacing) * xprev))+'px)',
									'transform': 'translateY(-'+(((s.total) * s.height) + (parseInt(options.spacing) * xprev))+'px)'
								});
								s.div.slides.stop(true).addClass('animate').css({
									'-webkit-transform': 'translateY('+dist+')',
									'transform': 'translateY('+dist+')'
								});
							}else{
								s.div.slides.stop(true).css({
									top: '-'+(((s.total) * s.height) + (parseInt(options.spacing) * xprev))+'px'
								}).animate({
									top:dist
								},time,options.easing);
							};
						}else{
							//general slide
							var dist = '-'+((xprev * s.height) + (parseInt(options.spacing) * xprev))+'px';
							if(swiping!=true && direction=='right' && prev==1){
								//if seamless
								if(s.transforms){
									s.div.slides.stop(true).removeClass('animate').css({
										'-webkit-transform': 'translateY(0px)',
										'transform': 'translateY(0px)'
									});
								}else{
									s.div.slides.stop(true).css({
										top: 0
									});
								};
							};
							if(s.transforms){
								s.div.slides.stop(true).addClass('animate').css({
									'-webkit-transform': 'translateY('+dist+')',
									'transform': 'translateY('+dist+')'
								});
							}else{
								s.div.slides.stop(true).animate({
									top:dist
								},time,options.easing);
							};
						};
					}else{
						//horizontal
						if(s.cloned==true && s.current==1 && prev==s.total && direction!='left'){
							//seamless slide right
							var dist = '-'+(((s.total) * s.width) + (parseInt(options.spacing) * xprev))+'px';
							if(s.transforms){
								s.div.slides.stop(true).addClass('animate').css({
									'-webkit-transform': 'translateX('+dist+')',
									'transform': 'translateX('+dist+')'
								});
							}else{
								s.div.slides.stop(true).animate({
									left:dist
								},time,options.easing);
							};
						}else if(s.cloned==true && s.current==s.total && prev==1 && direction!='right' && swiping!=true){
							//seamless slide left
							var dist = '-'+((xprev * s.width) + (parseInt(options.spacing) * xprev))+'px';
							if(s.transforms){
								s.div.slides.stop(true).removeClass('animate').css({
									'-webkit-transform': 'translateX(-'+(((s.total) * s.width) + (parseInt(options.spacing) * xprev))+'px)',
									'transform': 'translateX(-'+(((s.total) * s.width) + (parseInt(options.spacing) * xprev))+'px)'
								});
								s.div.slides.stop(true).addClass('animate').css({
									'-webkit-transform': 'translateX('+dist+')',
									'transform': 'translateX('+dist+')'
								});
							}else{
								s.div.slides.stop(true).css({
									left: '-'+(((s.total) * s.width) + (parseInt(options.spacing) * xprev))+'px'
								}).animate({
									left:dist
								},time,options.easing);
							};
						}else if(s.cloned==true && s.current==s.total && prev==1 && direction!='right' && swiping==true){
							//seamless slide left (swiping)
							var dist = (s.width + (parseInt(options.spacing) * xprev))+'px';
							if(s.transforms){
								s.div.slides.stop(true).removeClass('animate').css({
									'-webkit-transform': 'translateX(-'+(((s.total) * s.width) + (parseInt(options.spacing) * xprev))+'px)',
									'transform': 'translateX(-'+(((s.total) * s.width) + (parseInt(options.spacing) * xprev))+'px)'
								});
								s.div.slides.stop(true).addClass('animate').css({
									'-webkit-transform': 'translateX('+dist+')',
									'transform': 'translateX('+dist+')'
								});
							}else{
								s.div.slides.stop(true).animate({
									left:dist
								},time,options.easing);
							};
						}else{
							//general slide
							var dist = '-'+((xprev * s.width) + (parseInt(options.spacing) * xprev))+'px';
							if(swiping!=true && direction=='right' && prev==1){
								//if seamless
								if(s.transforms){
									s.div.slides.stop(true).removeClass('animate').css({
										'-webkit-transform': 'translateX(0px)',
										'transform': 'translateX(0px)'
									});
								}else{
									s.div.slides.stop(true).css({
										left: 0
									});
								};
							};
							if(s.transforms){
								s.div.slides.stop(true).addClass('animate').css({
									'-webkit-transform': 'translateX('+dist+')',
									'transform': 'translateX('+dist+')'
								});
							}else{
								s.div.slides.stop(true).animate({
									left:dist
								},time,options.easing);
							};
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
						s.div.left.addClass('slide_left_inactive');
					};
				}else{
					s.div.left.removeClass('slide_left_inactive');
				};
				if(slideNo == s.total){
					if(options.loop==false){
						s.div.right.addClass('slide_right_inactive');
					};
				}else{
					s.div.right.removeClass('slide_right_inactive');
				};
				//update data
				s.left_current = parseInt(dist);
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
				s.div.nav.html('');
				//UNBIND EVENTS
				s.div.left.unbind();
				s.div.right.unbind();
				s.slider.find('*').stop(true).unbind().off();
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


