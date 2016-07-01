(function() {
  'use strict';




// preloader
  
  (function(){
    var imgs = [];

    $.each($('*'), function(){
      var $this = $(this),
          background = $this.css('background-image'),
          img = $this.is('img');

      if (background != 'none') {

        var path = background.replace('url("', "").replace('")', "");
        var path = path.replace('url(', "").replace(')', "");
        imgs.push(path);

      }

      if (img) {
        var path = '' + $this.attr('src');

        if ( (path) && ($this.css('display') !== 'none') ) {
          imgs.push(path);
        }
      }

    });

    var loaded = 1;

    for (var i = 0; i < imgs.length; i++) {
      var image = $('<img>', {
        attr: {
          src: imgs[i]
        }
      });
      $(image).load(function(){
        var percentLoaded = countPercent(loaded,imgs.length);
        setPercent(percentLoaded);
        loaded++;
      });  
    };

    function countPercent(current, total){
      return Math.ceil(current / total * 100);
    }

    

    function setPercent(percent){

      $('.preloader__percents').text(percent);
      
      if (percent >= 100) {
        $('.preloader__hidden').delay(500).css('display', 'block');
        $('.preloader').delay(500).fadeOut(300);
      }

    }


  })();



// blur 
function blur(){

  var bg = $('.blur__bg');

  if (bg.length === 0) {
    return;
  };

  var form = $('.blur__form'),
    bgWidth = bg.width(),
    posTop  = bg.offset().top  - form.offset().top,
    posLeft = bg.offset().left - form.offset().left;

  form.css({
    'background-size': bgWidth + 'px' + ' ' + 'auto',
    'background-position': posLeft + 'px' + ' ' + posTop + 'px'
  });
};

$(window).on('load resize', function(){
  blur();
});



// slider title animation
$(function() {
  
  var 
    titleWrap = $('.slider__info .section-title__inner'),
    inject,
    delay;

  titleWrap.each(function(){
    
    var $this = $(this);
    var titleText = $this.text();
    inject = '';
    $this.html('');
    var i = 0;

    $.each(titleText.split(' '), function(c, word) {

        inject = '';
        $.each(word.split(''), function(k, char) {
          inject += '<span class="char char--' + i + '">' + char + '</span>';
          i++;
        });

        var word = '<span class="word">' + inject + '</span>';
        $this.append(word);
    });

  });
});

// scroll up button, scroll down button

  (function(){

    function scrollTo(pos, duration){
      $('html, body').animate({
        scrollTop: pos
      }, duration);
    }

    $('.scroll-control--down').on('click', function(e){
      e.preventDefault();
      scrollTo( $(".header").height() , 500);
    });

    $('.scroll-control--up').on('click', function(e){
      e.preventDefault();
      scrollTo( '0', 700 );
    });

  })();


// blog
  (function(){

    var html = $('html');
    $('.off-canvas--menu').on('click', function() {
      html.toggleClass('html--blog-opened');
    });

    $(window).on({

      'resize' : function(){
        if ( $( window ).width() > 768 ) {
          html.removeClass('html--blog-opened');
        }
        blogMenuFindTop();
      },
      'scroll' : function(){
        var header = $('.header');
        var headerHeight = parseInt($(header).css('height'));
        var menu = $('.off-canvas--menu');
        var scrollY = window.scrollY;

        if (scrollY > headerHeight) {
          menu.addClass('fixed');
        } else {
          menu.removeClass('fixed');
        }
        
      }
    });

  })();

// blog menu: making it fixed
  
  function blogMenuFindTop() {
    var header = $('.header');
    var menu = $('.off-canvas--menu');

    if ( $( window ).width() > 768 ) {
      $(menu).css('top', $(header).css('height'));
    } else {
      $(menu).css('top', '0');
    }
  }

  blogMenuFindTop();




// hamburger menu using css transitions


  (function(){

    $('#burger-btn').on('click', function() {
      $(this).toggleClass('burger-btn--active');
      // $('.header__burger').toggleClass('fixed');
      $('.main-menu').toggleClass('main-menu--open');
    });

  })();




// sklls animation


  function showSkills(){

    var arc, circumference;
    var time = 0;
    var delay = 150;

    $('circle.inner').each(function(i, el){

      var arc = Math.ceil($(el).data('arc'));
      var circumference = Math.ceil($(el).data('circumference'));

      setTimeout(function(){
        $(el).css('stroke-dasharray', arc+'px ' + circumference + 'px');
      }, time += delay );
    });

  }

  setTimeout(showSkills, 200);






// flipping animation

  (function(){

    var isWelcomeFlipped = false,
        buttonTriggerFlip = $('.btn--show-login'),
        flipContainer = $('.flip-container');


    buttonTriggerFlip.on('click', function(e){

      e.preventDefault();
      isWelcomeFlipped = true;
      flipContainer.addClass('flip');
      buttonTriggerFlip.fadeTo(300, 0).css('visibility', 'hidden');
    });


    $('.wrapper--welcome, .footer--welcome').on('click', function(e){
      
      // если кликаем на карточке, то переворачивать не надо
      if (e.target.closest('.welcome__card') !== null) {
        return;
      }
      // если кликаем не на карточке, то
      if (isWelcomeFlipped && 
          e.target.id != buttonTriggerFlip.attr('id')
        ) {

        isWelcomeFlipped = false;
        flipContainer.removeClass('flip');
        buttonTriggerFlip.fadeTo(300, 1, function(){
          buttonTriggerFlip.css('visibility', 'visible');
        })
      }

    });

    $('.btn--hide-login').on('click', function(e){

      e.preventDefault();
      isWelcomeFlipped = false;
      flipContainer.removeClass('flip');
      buttonTriggerFlip.fadeTo(300, 1).css('visibility', 'visible');
    });

  })();

})();