


/*

  AUTHOR:    Alex Bimpson
  NAME:      Prrple Slider
  WEB:       www.prrple.com
  REQUIRES:  jQuery, jQuery TouchSwipe (optional)
  VERSION:   2.18
  UPDATED:   2018-06-07

*/



/************************************************************************************************************/
/********************************************** PRRPLE - SLIDER *********************************************/
/************************************************************************************************************/


(function($){
  
  
  /******************** CONFIG ********************/
  $.prrpleSliderConfig = $.prrpleSliderConfig || {
    // DEV
    debug:            false,               // show console logs?
    // ELEMENTS
    el_slider_area:   '.slider_area',      // define slider area element
    el_slides:        '.slides',           // define slides element
    el_slide:         '.slide',            // define slide elements
    el_left:          '.slider_left',      // define left arrow element
    el_right:         '.slider_right',     // define right arrow element
    el_dotwrap:       '.slider_dotwrap',   // define nav dot wrapper
    el_dot:           '.slider_dot',       // define nav dots
    el_controls:      '.slider_controls',  // define arrow wrapper
    el_play:          '.slider_play',      // define play button
    el_pause:         '.slider_pause',     // define pause button
    // SIZING
    width:            null,          // define specific width
    height:           null,          // define specific height
    spacing:          0,             // spacing between slides
    multiple:         1,             // how many slides in viewport
    // SWIPING
    swiping:          true,          // enable swiping?
    richSwiping:      true,          // use rich swiping?
    // ANIMATION
    direction:        'horizontal',  // horizontal, vertical
    transition:       'slide',       // fade, slide
    transitionTime:   500,           // how long to change slides
    easing:           'swing',       // animation easing
    loop:             true,          // whether or not to infinitely loop the slider
    loopSeamless:     true,          // whether or not a looping slider should seamlessly rotate
    csstransforms:    true,          // use css transforms?
    // AUTOPLAY
    autoPlay:         false,         // play slider automatically?
    autoPlayInterval: 4000,          // how often to automatically switch between slides
    pauseOnClick:     true,          // pause slider after interacting?
    // MISC
    windowsize:       true,          // resize slider on browser resize
    addArrows:        true,          // if arrows don't exist, dynamically add them
    addDots:          true,          // if dots don't exist, dynamically add them
    hideArrows:       true,          // whether to hide arrows if there's only one slide e.g. for dynamically loaded content
    textDots:         false,         // add text to dots (using data-nav attribute)
    firstSlide:       1,             // the slide number to start on
    callback:         null,          // callback function after a slide changes
    callback_end:     null           // callback function after a slide changes and animation completes
  };
  
  
  /******************** NEW SLIDER ********************/
  $.fn.prrpleSlider = function(params){
    var options = $.extend({}, $.prrpleSliderConfig, params);
    options.id = ($(this).attr('id')?$(this).attr('id'):'');
    this.each(function(){
      // remove previous slider
      try{
        $(this).data('prrpleSlider').removeSlider();
      }catch(e){};
      // create new slider
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
      
      
      // SLIDER
      slider: root,      // slider element
      el: {},            // slider elements
      width: 0,          // slider width
      height: 0,         // slider height
      
      
      // STATUS
      total: 0,          // total slides
      current: 1,        // current slide
      prev: 1,           // previous slide
      next: 1,           // next slide
      pos_current: 0,    // current slide position
      paused: false,     // is animation paused?
      transforms: false, // are css transforms enabled?
      cloned: false,     // are there cloned slides? (seamless looping)
      t1: null,          // timeouts
      t2: null,
      
      
      // INITIALISE
      init: function(){
        if(options.debug) console.log('%c'+options.id+' init','color:#0053A0');
        // transforms
        s.transforms = (options.csstransforms!=true?false:s.test_transforms());
        // cloned
        s.cloned = (options.transition=='slide' && options.loop==true && options.loopSeamless==true?true:false);
        // get elements
        s.get_elements();
        // get info
        s.get_info();
        // update slider classes
        s.update_class();
        // get slider dimensions
        s.get_dims();
        // update size & position
        s.update_size();
        // update visibility (when fading)
        s.update_visibility();
        // clone slides (when seamless looping)
        s.add_clones();
        // add nav dots
        s.add_dots();
        // add nav arrows
        s.add_arrows();
        // add nav controls
        s.add_controls();
        // add resize detection
        s.resize.add();
        // add swipe control
        s.swipe.add();
        // hide relevant arrows
        s.hide_arrows();
        // easing
        if(typeof($.easing[options.easing])==='undefined'){
          options.easing = 'swing';
        };
        // go to initial slide
        s.goTo(options.firstSlide,true);;
        // callback
        if(typeof(options.callback)==='function'){
          options.callback(s.current,s.total);
        };
        if(typeof(options.callback_end)==='function'){
          options.callback_end(s.current,s.total);
        };
        // autoplay
        s.autoplay();
        // add inited class
        s.slider.addClass('slider_init');
      },
      
      
      // TEST FOR CSS TRANSFORMS
      test_transforms: function(){
        var prefixes = 'transform WebkitTransform'.split(' '); // MozTransform OTransform msTransform
        var div = document.createElement('div');
        for(var i = 0; i < prefixes.length; i++) {
          if(div && div.style[prefixes[i]] !== undefined) {
            return true;// prefixes[i];
          };
        };
        return false;
      },
      
      
      // GET ELEMENTS
      get_elements: function(){
        if(options.debug) console.log('%c'+options.id+' get_elements','color:#0053A0');
        s.el.slider_area = s.slider.find(options.el_slider_area);
        s.el.slides = s.slider.find(options.el_slides);
        s.el.slide = s.slider.find(options.el_slide);
        s.el.left = s.slider.find(options.el_left);
        s.el.right = s.slider.find(options.el_right);
        s.el.nav = s.slider.find(options.el_dotwrap);
        s.el.controls = s.slider.find(options.el_controls);
        s.el.play = s.slider.find(options.el_play);
        s.el.pause = s.slider.find(options.el_pause);
      },
      
      
      // GET INFO
      get_info: function(){
        if(options.debug) console.log('%c'+options.id+' get_info','color:#0053A0');
        s.total = s.slider.find(options.el_slide).length;
      },
      
      
      // UPDATE CLASS
      update_class: function(){
        if(options.debug) console.log('%c'+options.id+' update_class','color:#0053A0');
        // transition
        if(options.transition == 'fade'){
          s.slider.addClass('fade');
        }else{
          s.slider.removeClass('fade');
        };
        // direction
        if(options.direction == 'vertical'){
          s.slider.addClass('vertical');
        }else{
          s.slider.removeClass('vertical');
        };
      },
      
      
      // GET DIMENSIONS
      get_dims: function(){
        if(options.debug) console.log('%c'+options.id+' get_dims','color:#0053A0');
        // reset
        s.slider.removeAttr('style');
        s.el.slider_area.removeAttr('style');
        s.el.slides.removeAttr('style');
        s.el.slide.removeAttr('style');
        s.slider.find(options.el_slide).show();
        // get width
        if(options.width==null){
          // s.width = s.el.slider_area.innerWidth();
          s.width = s.el.slider_area.width();
        }else{
          s.width = options.width;
        };
        // get height
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
              width: (s.width / options.multiple)
            });
            s.el.slides.css({
              width: ((s.width / options.multiple) * (s.total+(2*options.multiple)))
            });
            if(options.direction=='vertical'){
              s.height = 0;
              s.slider.find(options.el_slide).each(function(){
                var h2 = $(this).height();
                if(h2 > s.height){
                  s.height = h2;
                };
              });
            }else{
              s.height = s.el.slider_area.innerHeight();
            };
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
      
      
      // UPDATE SIZE
      update_size: function(){
        if(options.debug) console.log('%c'+options.id+' update_size','color:#0053A0');
        // slider
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
        // slider_area
        s.el.slider_area.css({
          width: s.width,
          height: s.height
        });
        // slides
        if(options.transition == 'fade'){
          s.el.slides.css({
            width: s.width,
            height: s.height
          });
        }else{
          if(options.direction == 'vertical'){
            var h;
            if(s.cloned==true){
              h = s.height * (s.total + (options.multiple*2));
            }else{
              h = s.height * s.total;
            };
            s.el.slides.css({
              width: s.width,
              height: h/options.multiple
            });
          }else{
            var w;
            if(s.cloned==true){
              w = s.width * (s.total + (options.multiple*2));
            }else{
              w = s.width * s.total;
            };
            s.el.slides.css({
              width: w/options.multiple,
              height: s.height
            });
          };
        };
        // slide
        if(options.direction == 'vertical'){
          s.el.slide.css({
            width: s.width,
            height: s.height/options.multiple
          });
        }else{
          s.el.slide.css({
            width: s.width/options.multiple,
            height: s.height
          });
        }
      },
      
      
      // UPDATE VISIBILITY
      update_visibility: function(){
        if(options.debug) console.log('%c'+options.id+' update_visibility','color:#0053A0');
        if(options.transition == 'fade'){
          s.slider.find(options.el_slide).hide();
          s.slider.find(options.el_slide+':first').show();
        };
      },
      
      
      // ADD CLONED SLIDES (WHEN SEAMLESSLY LOOPING)
      add_clones: function(){
        if(options.debug) console.log('%c'+options.id+' add_clones','color:#0053A0');
        // remove clones
        // s.slider.find(options.el_slide+'.cloned').remove();
        if(s.cloned==true && s.slider.find(options.el_slide+'.cloned').length<1 && s.total>1){
          var n;
          var slide;
          var first;
          var last;
          // first slides
          for(i=0;i<options.multiple;i++){
            n = i+1;
            slide = options.el_slide+':nth-child('+n+')';
            first = s.slider.find(slide);
            first.clone().addClass('cloned').appendTo(s.el.slides);
          };
          // last slides
          var clones2 = [];
          for(j=0;j<options.multiple;j++){
            n = (s.slider.find(options.el_slide).length-options.multiple-j);
            slide = options.el_slide+':nth-child('+n+')';
            last = s.slider.find(slide);// .slice(0,1);
            clones2.push(last);
          };
          for(k=0;k<clones2.length;k++){
            clones2[k].clone().addClass('cloned cloned2').prependTo(s.el.slides);
          }
          s.el.slide = s.slider.find(options.el_slide);
        };
      },
      
      
      // ADD DOTS
      add_dots: function(){
        if(options.debug) console.log('%c'+options.id+' add_dots','color:#0053A0');
        if(s.total <= 1){
          // hide dots if 1 or less slides
          s.el.nav.hide();
        }else{
          // add dot wrapper if doesn't exist
          if(options.addDots){
            if(s.el.nav.length<1){
              s.slider.append('<div class="'+(options.el_dotwrap.replace('.',''))+'"></div>');
            };
            s.el.nav = s.slider.find(options.el_dotwrap);
          };
          // create dots
          s.el.nav.html('');
          for(i=1; i<(s.total+1); i++){
            var t = i;
            if(options.textDots){
              t = s.slider.find(options.el_slide+':nth-child('+(s.cloned==true?i+1:i)+')').attr('data-nav');
            };
            s.el.nav.append('<a class="'+(options.el_dot.replace('.',''))+' '+(i==1?'current':'')+'" id="'+(options.el_dot.replace('.',''))+'_'+i+'" >'+t+'</a>');
          };
          // bind events
          s.el.nav.find(options.el_dot).each(function(){
            $(this).unbind('click');
            $(this).click(function(){
              if(options.debug) console.log('%c--- click dot ---','color:#0053A0');
              var slideNo = parseInt($(this).attr('id').replace((options.el_dot.replace('.',''))+'_',''));
              s.goTo(slideNo);
              return false;
            });
          });
        };
      },
      
      
      // ADD ARROWS
      add_arrows: function(){
        if(options.debug) console.log('%c'+options.id+' add_arrows','color:#0053A0');
        if(s.total <= 1){
          // hide arrows if 1 or less slides
          if(options.hideArrows == true){
            s.el.left.hide();
            s.el.right.hide();
          };
        }else{
          // add arrows if they don't exists
          if(options.addArrows){
            if(s.el.left.length<1){
              s.slider.append('<a class="'+(options.el_left.replace('.',''))+'">Prev</a>');
            };
            if(s.el.right.length<1){
              s.slider.append('<a class="'+(options.el_right.replace('.',''))+'">Next</a>');
            };
            s.el.left = s.slider.find(options.el_left);
            s.el.right = s.slider.find(options.el_right);
          };
          // show and bind events
          s.el.left.show();
          s.el.right.show();
          if(s.el.left.length > 0){
            // reset
            s.el.left.removeClass('inactive');
            s.el.right.removeClass('inactive');
            // right
            s.el.right.unbind('click').click(function(){
              if(options.debug) console.log('%c--- click right ---','color:#0053A0');
              s.slide_right();
              return false;
            });
            // left
            s.el.left.unbind('click').click(function(){
              if(options.debug) console.log('%c--- click left ---','color:#0053A0');
              s.slide_left();
              return false;
            });
          };
        };
      },
      
      
      // ADD CONTROLS
      add_controls: function(){
        if(options.debug) console.log('%c'+options.id+' add_controls','color:#0053A0');
        if(s.total <= 1){
          s.el.controls.hide();
        }else{
          s.el.controls.show();
          s.el.play.addClass('hidden');
          s.el.pause.removeClass('hidden');
          // pause
          s.el.pause.unbind('click').click(function(){
            s.el.pause.addClass('hidden');
            s.el.play.removeClass('hidden');
            s.paused = true;
            return false;
          });
          // resume
          s.el.play.unbind('click').click(function(){
            s.el.play.addClass('hidden');
            s.el.pause.removeClass('hidden');
            s.paused = false;
            return false;
          });
        };
      },
      
      
      // WINDOW RESIZE
      resize: {
        // add
        add: function(){
          if(options.windowsize==true){
            $(window).load(s.resize.delay);
            $(window).resize(s.resize.delay);
          };
        },
        // remove
        remove: function(){
          clearTimeout(s.resize.t);
          $(window).off("resize",s.resize.delay);
        },
        // delay
        t: null,
        delay: function(){
          clearTimeout(s.resize.t);
          s.resize.t = setTimeout(function(){
            s.resize.run();
          },100);
        },
        // run
        run: function(){
          // dimensions
          s.get_dims();
          s.update_size();
          s.update_visibility();
          s.add_clones();
          // go to current
          s.goTo(s.current,true);
        }
      },
      
      
      // HIDE RELEVANT ARROWS
      hide_arrows: function(){
        if(options.debug) console.log('%c'+options.id+' hide_arrows','color:#0053A0');
        if(options.loop==false && options.firstSlide==1){
          s.el.left.addClass('inactive');
        }else if(options.loop==false && options.firstSlide==s.total){
          s.el.right.addClass('inactive');
        };
      },
      
      
      // AUTO PLAY INTERVAL
      autoplay_int: null,
      autoplay: function(){
        if(options.debug) console.log('%c'+options.id+' autoplay','color:#0053A0');
        if(options.autoPlay == true){
          clearInterval(s.autoplay_int);
          s.autoplay_int = setInterval(function(){
            if(s.paused==false){
              s.slide_right(true);
            };
          },options.autoPlayInterval);
        };
      },
      
      
      // GET POSITION - SPECIFIED SLIDE
      get_pos: function(slide,direction){
        if(options.debug) console.log('%c'+options.id+' get_pos','color:#0053A0');
        var l = (direction=='vertical'?s.height:s.width) / options.multiple;
        var total;
        if(s.cloned && s.total>1){
          total = parseInt(slide) + parseInt(options.multiple) - 1;
        }else{
          total = slide-1;
        }
        return '-'+((total * l) + (parseInt(options.spacing) * total))+'px';
      },
      
      
      // GET POSITION - FIRST SLIDE
      get_pos_first: function(direction){
        if(options.debug) console.log('%c'+options.id+' get_pos_first','color:#0053A0');
        var total;
        if(s.cloned && s.total>1){
          var l = (direction=='vertical'?s.height:s.width);
          total = -(l + (parseInt(options.spacing)))+'px';
        }else{
          total = '0px';
        };
        return total;
      },
      
      
      // GET POSITION - LAST SLIDE
      get_pos_last: function(direction){
        if(options.debug) console.log('%c'+options.id+' get_pos_last','color:#0053A0');
        var l = (direction=='vertical'?s.height:s.width) / options.multiple;
        var total;
        if(s.cloned && s.total>1){
          total = s.total+ options.multiple - 1;
        }else{
          total = s.total-1;
        }
        var total2 = parseInt('-'+((total * l) + (parseInt(options.spacing) * total)));
        return total2;
      },
      
      
      // GET POSITION - CLONED FIRST SLIDE (AT END)
      get_pos_clone_first: function(direction){
        if(options.debug) console.log('%c'+options.id+' get_pos_clone_first','color:#0053A0');
        var l = (direction=='vertical'?s.height:s.width) / options.multiple;
        var total = s.total + options.multiple;
        var total2 = '-'+((total * l) + (parseInt(options.spacing) * (total-1)))+'px';
        return total2;
      },
      
      
      // GET POSITION - CLONED LAST SLIDE (AT START)
      get_pos_clone_last: function(direction){
        if(options.debug) console.log('%c'+options.id+' get_pos_clone_last','color:#0053A0');
        return '0px';
      },
      
      
      // GET POSITION - SEAMLESS LEFT SWIPE 
      get_pos_left_swipe: function(direction){
        var l = (direction=='vertical'?s.height:s.width) / options.multiple;
        return '-' + (l * (options.multiple-1)) + 'px';
      },
      
      
      // SLIDE LEFT
      slide_left: function(skip_pause,swiping){
        if(options.debug) console.log('%c'+options.id+' slide_left','color:#0053A0');
        if(s.total>1 && !s.el.left.hasClass('inactive')){
          // go to next slide
          if(s.current > 1){
            s.goTo(s.current-1,false,'left',swiping);
          }else{
            if(options.loop == true){
              s.goTo(s.total,false,'left',swiping);
            };
          };
          // pause autoplay
          if(skip_pause!=true && options.pauseOnClick==true){
            s.paused = true;
          };
        };
      },
      
      
      // SLIDE RIGHT
      slide_right: function(skip_pause,swiping){
        if(options.debug) console.log('%c'+options.id+' slide_right','color:#0053A0');
        if(s.total>1 && !s.el.right.hasClass('inactive')){
          // go to next slide
          if(s.current < s.total){
            s.goTo(s.current+1,false,'right',swiping);
          }else{
            if(options.loop == true){
              s.goTo(1,false,'right',swiping);
            }
          }
          // pause autoplay
          if(skip_pause!=true && options.pauseOnClick==true){
            s.paused = true;
          }
        }
      },
      
      
      // GO TO SLIDE
      goTo: function(slideNo,skip,direction,swiping){
        if(options.debug) console.log('%c'+options.id+' goTo '+slideNo,'color:#0053A0');
        // time
        var time;
        if(skip==true){
          time = 0;
        }else{
          time = options.transitionTime;
        };
        // store previous
        var prev = s.current;
        // save
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
        // if(s.next>s.total){
        if(s.next>(s.total-options.multiple+1)){
          if(options.loop==true){
            s.next = 1;
          }else{
            s.next = 0;
          };
        };
        // update nav
        s.el.nav.find(options.el_dot).removeClass('current');
        s.el.nav.find('#'+(options.el_dot.replace('.',''))+'_'+slideNo).addClass('current');
        // animate slider
        if(options.transition == 'fade'){
          // fade
          s.slider.find(options.el_slide).fadeOut(time);
          s.slider.find(options.el_slide+':nth-child('+(slideNo)+')').fadeIn(time);
        }else if(options.transition == 'slide'){
          // slide
          if(options.debug) console.log('%c'+options.id+' '+options.direction,'color:#0053A0');
          // get position
          var dist;
          var dist_reset;
          if(s.cloned==true && s.current==1 && prev==s.total && direction!='left' && (s.total>2 || typeof(direction)!=='undefined')){
            // seamless slide right - animate to cloned first slide
            dist = s.get_pos_clone_first(options.direction);
          }else if(s.cloned==true && s.current==s.total && prev==1 && direction!='right' && swiping!=true && (s.total>2 || typeof(direction)!=='undefined')){
            // seamless slide left - reset to cloned first slide, then animate left
            dist = s.get_pos(slideNo,options.direction);
            dist_reset = s.get_pos_clone_first(options.direction);
          }else if(s.cloned==true && s.current==s.total && prev==1 && direction!='right' && swiping==true){
            // seamless slide left (swiping)
            dist = s.get_pos_left_swipe(options.direction);
          }else{
            // general slide
            dist = s.get_pos(slideNo,options.direction);
            if(swiping!=true && direction=='right' && prev==1){
              dist_reset = s.get_pos_first(options.direction);
            };
          };
          if(options.direction == 'vertical'){
            // vertical - reset
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
            // vertical - animate
            if(s.transforms){
              setTimeout(function(){ // brief timeout avoids css animating reset
                if(skip==true){
                  s.el.slides.stop(true,true).removeClass('animate');
                }else{
                  s.el.slides.stop(true,true).addClass('animate');
                };
                s.el.slides.stop(true,true).css({
                  '-webkit-transform': 'translateY('+dist+')',
                  'transform': 'translateY('+dist+')'
                });
              },5);
            }else{
              s.el.slides.stop(true,true).animate({
                top:dist
              },time,options.easing);
            };
          }else{
            // horizontal - reset
            if(typeof(dist_reset)!=='undefined'){
              if(s.transforms){
                s.el.slides.stop(true,true).removeClass('animate').css({
                  '-webkit-transform': 'translateX('+dist_reset+')',
                  'transform': 'translateX('+dist_reset+')'
                });
                timeout = 0;
              }else{
                s.el.slides.stop(true,true).css({
                  left:dist_reset
                });
              };
            };
            // horizontal - animate
            if(s.transforms){
              setTimeout(function(){ // brief timeout avoids css animating reset
                if(skip==true){
                  s.el.slides.stop(true,true).removeClass('animate');
                }else{
                  s.el.slides.stop(true,true).addClass('animate');
                };
                s.el.slides.stop(true,true).css({
                  '-webkit-transform': 'translateX('+dist+')',
                  'transform': 'translateX('+dist+')'
                });
              },5);
            }else{
              s.el.slides.stop(true,true).animate({
                left:dist
              },time,options.easing);
            };
          };
          // save current position
          s.pos_current = parseInt(dist);
        };
        // class
        s.slider.find(options.el_slide).removeClass('current prev next');
        s.slider.find(options.el_slide+':nth-child('+(s.current+(s.cloned==true?1:0))+')').addClass('current');
        s.slider.find(options.el_slide+':nth-child('+(s.prev+(s.cloned==true?1:0))+')').addClass('prev');
        s.slider.find(options.el_slide+':nth-child('+(s.next+(s.cloned==true?1:0))+')').addClass('next');
        s.t1 = setTimeout(function(){
          s.slider.find(options.el_slide).removeClass('current2 prev2 next2');
          s.slider.find(options.el_slide+':nth-child('+(s.current+(s.cloned==true?1:0))+')').addClass('current2');
          s.slider.find(options.el_slide+':nth-child('+(s.prev+(s.cloned==true?1:0))+')').addClass('prev2');
          s.slider.find(options.el_slide+':nth-child('+(s.next+(s.cloned==true?1:0))+')').addClass('next2');
        },time);
        // interval
        s.autoplay();
        // arrows
        if(slideNo == 1){
          if(options.loop==false){
            s.el.left.addClass('inactive');
          };
        }else{
          s.el.left.removeClass('inactive');
        };
        // if(slideNo == s.total){
        if(slideNo == (s.total-options.multiple+1)){
          if(options.loop==false){
            s.el.right.addClass('inactive');
          };
        }else{
          s.el.right.removeClass('inactive');
        };
        // callback
        if(typeof(options.callback)==='function'){
          options.callback(slideNo,s.total);
        };
        s.t2 = setTimeout(function(){
          if(typeof(options.callback_end)==='function'){
            options.callback_end(slideNo,s.total);
          };
        },time);
      },
      
      
      // SWIPE
      swipe: {
        // add
        add: function(){
          if(options.swiping==true){
            if(typeof($.fn.swipe)==='undefined'){
              console.log('%cPlease include the jQuery TouchSwipe plugin for swipe gestures.','color:#0053A0');
            }else{
              if(options.richSwiping==true && options.transition=='slide'){
                // rich swiping
                if(options.direction=='vertical'){
                  // vertical
                  s.slider.swipe({
                    swipeStatus: function swipeStatus(event,phase,direction,distance){
                      s.swipe.rich(event,phase,direction,distance,'vertical');
                    },
                    threshold:100,
                    allowPageScroll:'horizontal',
                    excludedElements: ''
                  });
                }else{
                  // horizontal
                  s.slider.swipe({
                    swipeStatus: function swipeStatus(event,phase,direction,distance){
                      s.swipe.rich(event,phase,direction,distance,'horizontal');
                    },
                    threshold:100,
                    allowPageScroll:'vertical',
                    excludedElements: ''
                  });
                }
              }else{
                // basic swiping
                if(options.direction=='vertical'){
                  // vertical
                  s.slider.swipe({
                    swipeUp:function(){
                      s.slide_right();
                    },
                    swipeDown:function(){
                      s.slide_left();
                    },
                    threshold:100,
                    allowPageScroll:'horizontal',
                    excludedElements: ''
                  });
                }else{
                  // horizontal
                  s.slider.swipe({
                    swipeLeft:function(){
                      s.slide_right();
                    },
                    swipeRight:function(){
                      s.slide_left();
                    },
                    threshold:100,
                    allowPageScroll:'vertical',
                    excludedElements: ''
                  });
                }
              }
            }
          }
        },
        // remove
        remove: function(){
          if(options.swiping==true){
            s.slider.swipe('destroy');
          }
        },
        // rich swiping
        rich: function(event, phase, direction, distance, orientation, callback){
          if(options.swiping==true){
            if(options.debug) console.log('%c--- swipe rich - '+phase+' - '+direction+' - '+distance+' - '+orientation+' ---','color:#0053A0');
            if(s.total>1){
              var dist;
              if(phase=='start'){
                // reset position (for seamless swipes)
                if(s.cloned==true && s.current==1){
                  // first
                  dist = s.get_pos_first(options.direction);
                }else if(s.cloned==true && s.current==s.total){
                  // last
                  dist = s.get_pos_last(options.direction);
                };
                if(orientation=='vertical'){
                  if(typeof(dist)!=='undefined'){
                    s.pos_current = parseInt(dist);
                    if(s.transforms){
                      s.el.slides.stop().removeClass('animate').css({
                        '-webkit-transform': 'translateY('+dist+')',
                        'transform': 'translateY('+dist+')'
                      });
                    }else{
                      s.el.slides.stop().css({
                        top:dist
                      });
                    };
                  };
                }else{
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
                };
                // callback
                if(typeof(callback) == "function"){
                  callback(s.current,s.total,phase,direction,distance);
                };
              }else if(phase=='move'){
                // get distance
                var d;
                if((orientation=='vertical' && direction=='up') || (orientation!='vertical' && direction=='left')){
                  d = -distance;
                }else if((orientation=='vertical' && direction=='down') || (orientation!='vertical' && direction=='right')){
                  d = distance;
                }else{
                  d = 0;
                };
                dist = (s.pos_current+d)+'px';
                // set position
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
                // callback
                if(typeof(callback) == "function"){
                  callback(s.current,s.total,phase,direction,distance,dist);
                };
              }else if(phase=='end'){
                // go to slide
                var c = true;
                if(orientation=='vertical' && direction=="down" && (s.current>1 || s.cloned==true)){
                  // vertical up
                  s.slide_left(true,true);
                }else if(orientation=='vertical' && direction=="up" && (s.current<(s.total-options.multiple+1) || s.cloned==true)){
                  // vertical down
                  s.slide_right(true,true);
                }else if(orientation!='vertical' && direction=="right" && (s.current>1 || s.cloned==true)){
                  // horizontal left
                  s.slide_left(true,true);
                }else if(orientation!='vertical' && direction=="left" && (s.current<(s.total-options.multiple+1) || s.cloned==true)){
                  // horizontal right
                  s.slide_right(true,true);
                }else{
                  c = false;
                  cancel();
                };
                // callback
                if(c!=false){
                  if(options.pauseOnClick==true){
                    s.paused = true;
                  };
                  if(typeof(callback) == "function"){
                    callback(s.current,s.total,phase,direction,distance);
                  };
                };
              }else{
                // cancel
                s.swipe.cancel(event, phase, direction, distance, orientation, callback);
              };
            };
          }
        },
        // cancel swipe
        cancel: function(event, phase, direction, distance, orientation, callback){
          // get distance
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
            }
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
            }
          }
          // callback
          if(typeof(callback) == "function"){
            callback(s.current,s.total,phase,direction,distance);
          }
        }
      },
      
      
      // REMOVE SLIDER
      remove: function(){
        if(options.debug) console.log('%c'+options.id+' remove slider','color:#0053A0');
        // remove resize detection
        s.resize.remove();
        // remove touchswipe
        s.swipe.remove();
        // clear timers & intervals
        clearTimeout(s.t1);
        clearTimeout(s.t2);
        clearTimeout(s.resize.t);
        clearInterval(s.autoplay_int);
        // remove dynamic elements
        if(options.addArrows){
          s.el.left.remove();
          s.el.right.remove();
        };
        if(options.addDots){
          s.el.nav.remove();
        }else{
          s.el.nav.html('');
        };
        // remove clones
        s.slider.find(options.el_slide+'.cloned').remove();
        // remove events and css from elements
        s.el.slider_area.stop(true,true).removeAttr('style').unbind().off();
        s.el.slides.stop(true,true).removeAttr('style').unbind().off();
        s.el.slide.stop(true,true).removeAttr('style').unbind().off();
        s.el.left.stop(true,true).removeAttr('style').unbind().off();
        s.el.right.stop(true,true).removeAttr('style').unbind().off();
        s.el.nav.stop(true,true).removeAttr('style').unbind().off();
        s.el.controls.stop(true,true).removeAttr('style').unbind().off();
        s.el.play.stop(true,true).removeAttr('style').unbind().off();
        s.el.pause.stop(true,true).removeAttr('style').unbind().off();
        // remove classes
        s.slider.removeClass('slider_init fade slide');
        s.slider.find(options.el_slide).removeClass('current current2 next next2 prev prev2');
      }
      
      
    };
    
    
    // INITIALISE
    s.init();
    
    
    // UPDATE FUNCTIONS
    this.update = function(options2){
      options = $.extend(options, options, options2);
      this.resizeSlider();
    };
    this.goToSlide = function(goTo,skip){
      if(goTo != s.current){
        s.goTo(goTo,skip);
      }
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
      s.resize.run();
    };
    this.removeSlider = function(){
      s.remove();
    };
    this.getCurrent = function(){
      return s.current;
    };
    
    
  };
  
  
})(jQuery);


