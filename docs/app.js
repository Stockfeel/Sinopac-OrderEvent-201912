"use strict";

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

// landing
var landing = new TimelineMax();

for (var i = 0; i < 10; i += 1) {
  var elem = document.querySelector(".ball:nth-child(".concat(i + 1, ")"));
  landing.add(originTrack(elem, [30, 40]), i * 8);
}

var bgBall = new TimelineMax();

for (var _i = 0; _i < 10; _i += 1) {
  var _elem = document.querySelector(".bgBall:nth-child(".concat(_i + 1, ")"));

  bgBall.add(originTrack(_elem, [10, 20]), _i * 1.5);
}

var downBall = new TimelineMax();

for (var _i2 = 0; _i2 < 10; _i2 += 1) {
  var _elem2 = document.querySelector(".down-bg .bgBall:nth-child(".concat(_i2 + 1, ")"));

  downBall.add(originTrack(_elem2, [10, 20]), _i2 * 1.5);
}

function originTrack(selector, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    min = _ref2[0],
    max = _ref2[1];

  var tl = new TimelineMax({
    repeat: -1
  });
  tl.set(selector, {
    opacity: 0
  });
  tl.fromTo(selector, 2, {
    opacity: 0
  }, {
    opacity: 1
  });
  tl.to(selector, randomBetween(min, max), {
    y: -2990,
    x: Math.random() > 0.5 ? 100 : -100,
    repeatDelay: randomBetween(1, 3),
    ease: Linear.easeNone
  });
  tl.fromTo(selector, 2, {
    opacity: 1
  }, {
    opacity: 0
  });
  return tl;
} // animation setting


var state = 'landing';
var fadeInInit = {
  y: -100,
  opacity: 0
};
var fadeInDropInit = {
  y: -100,
  opacity: 0
};
var fadeIn = {
  y: 0,
  opacity: 1,
  ease: Circ.easeInOut
};
var growInInit = {
  y: 300,
  opacity: 1
};
var growIn = {
  y: 0,
  opacity: 1,
  ease: Circ.easeInOut
};
var scaleInInit = {
  scale: 0,
  opacity: 1
};
var scaleIn = {
  scale: 1,
  opacity: 1,
  ease: Circ.easeInOut
};
var titleFadeInit = {
  x: 200,
  opacity: 0
};
var titleFadeBackInit = {
  x: -200,
  opacity: 0
};
var titleFade = {
  x: 0,
  opacity: 1,
  ease: Circ.easeInOut
};

function landingAnimation() {
  var landing = new TimelineMax();
  var selector = Array(10).fill(0).map(function(item, idx) {
    return ".landing__title img:nth-child(".concat(idx + 1, ")");
  });
  landing.staggerFromTo(selector, .1, {
    y: 100
  }, {
    y: 0
  }, .1);
}

$(window).ready(function() {
  landingAnimation();
}); // section animation

$(window).scroll(function(evt) {
  if ($(window).scrollTop() < $('#industry').offset().top && state !== 'landing') {
    state = 'landing';
    titleAnimation();
  } // industry 


  if ($(window).scrollTop() > $('#industry').offset().top && $(window).scrollTop() < $('#menu').offset().top) {
    if (state !== 'industry') {
      state = 'industry';
      var industry = new TimelineMax();
      var title = TweenMax.fromTo('.industry .title-bg', .5, titleFadeInit, titleFade);
      var land = TweenMax.fromTo('.industry .land', .5, fadeInInit, fadeIn);
      var front = TweenMax.fromTo('.industry .front img', 1, growInInit, growIn);
      var machine = TweenMax.fromTo('.industry .machine img', 1, growInInit, growIn);
      var building = TweenMax.fromTo('.industry .building img', 1, growInInit, growIn);
      var coin1 = TweenMax.fromTo('.industry .coin1', .5, fadeInDropInit, fadeIn);
      var coin2 = TweenMax.fromTo('.industry .coin2', .5, fadeInDropInit, fadeIn);
      var coin3 = TweenMax.fromTo('.industry .coin3 img', 1, growInInit, growIn);
      var chart3 = TweenMax.fromTo('.industry .chart3 img', 1, growInInit, growIn);
      var busTl = new TimelineMax();
      var busDrop = TweenMax.fromTo('.industry .bus', .5, {
        y: -300,
        opacity: 0,
        rotation: -10
      }, {
        y: 0,
        opacity: 1,
        ease: Linear.easeIn
      });
      var busLand = TweenMax.to('.industry .bus', .1, {
        rotation: 0,
        opacity: 1,
        ease: Linear.easeIn
      });
      var bus = TweenMax.fromTo('.industry .bus', 5, {
        x: 0,
        ease: Linear.easeNone
      }, {
        x: 400,
        ease: Linear.easeNone
      });
      busTl.add(busDrop).add(busLand).add(bus);
      var chart1 = TweenMax.fromTo('.industry .chart1', 1, {
        y: 50,
        opacity: 1
      }, {
        y: 0,
        opacity: 1,
        ease: Linear.easeNone,
        yoyo: true,
        repeat: -1
      });
      industry.add(title);
      industry.add(land, .2);
      industry.add(bus, .2);
      industry.add(coin1, .4);
      industry.add(coin2, .6);
      industry.add(building, .8);
      industry.add(machine, 1);
      industry.add(front, 1.2);
      industry.add(coin3, 1.4);
      industry.add(chart3, 1.6);
    }

    var airplane = TweenMax.fromTo('.industry .airplane', 2, {
      x: -100,
      y: 0,
      opacity: 1
    }, {
      x: 100,
      y: -200,
      opacity: 1,
      ease: Linear.easeNone
    }).pause();
    var sectionHeight = $('#industry').offset().top - $('#menu').offset().top;
    airplane.progress(Math.abs(($(window).scrollTop() - $('#industry').offset().top) / sectionHeight) * 2);
  } // invest 


  if ($(window).scrollTop() > $('#invest').offset().top) {
    if (state !== 'invest') {
      state = 'invest';
      var invest = new TimelineMax();

      var _title = TweenMax.fromTo('.invest .title-bg', .5, titleFadeBackInit, titleFade);

      var _land = TweenMax.fromTo('.invest .land', .5, fadeInInit, fadeIn);

      var wall = TweenMax.fromTo('.invest .wall', .5, fadeInInit, fadeIn);
      var other = TweenMax.fromTo('.invest .other', .5, fadeInInit, fadeIn);

      var _front = TweenMax.fromTo('.invest .front img', 1, growInInit, growIn);

      var _coin = TweenMax.fromTo('.invest .coin1', .5, fadeInDropInit, fadeIn);

      var _coin2 = TweenMax.fromTo('.invest .coin2', .5, fadeInDropInit, fadeIn);

      var _coin3 = TweenMax.fromTo('.invest .coin3', .5, fadeInDropInit, fadeIn);

      var time = TweenMax.fromTo('.invest .time', 1, fadeInDropInit, fadeIn);
      var center = TweenMax.fromTo('.invest .boxc1 img', 1, growInInit, growIn);
      var plant = TweenMax.fromTo('.invest .plant img', 1, growInInit, growIn);
      var cancel = TweenMax.fromTo('.invest .cancel', 1, scaleInInit, scaleIn);
      var check = TweenMax.fromTo('.invest .check', 1, scaleInInit, scaleIn);
      var boxeslTl = new TimelineMax();
      boxeslTl.fromTo('.invest .boxl1', {
        x: 0,
        y: 0
      }, {
        x: 40,
        y: -40
      });
      boxeslTl.fromTo('.invest .boxl2', {
        x: 0,
        y: 0
      }, {
        x: 20,
        y: -20
      });
      boxeslTl.staggerFromTo(['.invest .boxl1', '.invest .boxl2', '.invest .boxl3'], 1, {
        y: -20,
        opacity: 1
      }, {
        y: 0,
        opacity: 1,
        ease: Linear.easeNone,
        yoyo: true,
        repeat: -1
      }, 0.1);
      var boxesrTl = new TimelineMax();
      boxesrTl.fromTo('.invest .boxr1', {
        x: 0,
        y: 0
      }, {
        x: -40,
        y: 20
      });
      boxesrTl.staggerFromTo(['.invest .boxr1', '.invest .boxr2'], 1, {
        y: 0,
        opacity: 1
      }, {
        y: 10,
        opacity: 1,
        ease: Linear.easeNone,
        yoyo: true,
        repeat: -1
      }, 0.1);
      var circlesTl = new TimelineMax();
      circlesTl.staggerFromTo(['.invest .circle1', '.invest .circle2', '.invest .circle3'], 1, {
        scale: 0.8,
        opacity: 1
      }, {
        scale: 1,
        opacity: 1,
        ease: Linear.easeNone,
        yoyo: true,
        repeat: -1
      }, 0.2);
      invest.add(_land).add(_coin3, .2).add(_coin2, .4).add(_coin, .6).add(wall, .8).add(other, 1).add(time, 1).add(plant, 1.2).add(center, 1.2).add(boxesrTl, 1.2).add(cancel, 1.4).add(check, 1.4);
    }
  } // sources 


  if ($(window).scrollTop() > $('#sources').offset().top) {
    if (state !== 'sources') {
      var sources = new TimelineMax();

      var _title2 = TweenMax.fromTo('.sources .title-bg', .5, titleFadeInit, titleFade);

      var _land2 = TweenMax.fromTo('.sources .land', .5, fadeInInit, fadeIn);

      var _front2 = TweenMax.fromTo('.sources .front img', .5, growInInit, growIn);

      var tree1 = TweenMax.fromTo('.sources .tree1 img', .5, growInInit, growIn);
      var tree2 = TweenMax.fromTo('.sources .tree2 img', .5, growInInit, growIn);
      var pie = TweenMax.fromTo('.sources .pie', .5, fadeInInit, fadeIn);
      var bar = TweenMax.fromTo('.sources .bar', .5, fadeInInit, fadeIn);
      var bSquareS = TweenMax.fromTo('.sources .bSquareS', .5, fadeInInit, fadeIn);
      var ySquareS = TweenMax.fromTo('.sources .ySquareS', .5, fadeInInit, fadeIn);
      var bSquare = TweenMax.fromTo('.sources .bSquare', .5, fadeInInit, fadeIn);
      var gSquare = TweenMax.fromTo('.sources .gSquare', .5, fadeInInit, fadeIn);
      var line = TweenMax.fromTo('.sources .line img', .5, growInInit, growIn);
      var img1 = TweenMax.fromTo('.sources .img1', .5, fadeInInit, fadeIn);
      var img2 = TweenMax.fromTo('.sources .img2', .5, fadeInInit, fadeIn);
      var house = TweenMax.fromTo('.sources .house img', .5, growInInit, growIn);
      var mountain = TweenMax.fromTo('.sources .mountain img', .5, growInInit, growIn);

      var _boxeslTl = new TimelineMax();

      _boxeslTl.staggerFromTo(['.sources .chart1', '.sources .boxl1', '.sources .boxl2'], .5, {
        x: -100,
        y: 100
      }, {
        x: 0,
        y: 0
      }, 0.1);

      _boxeslTl.staggerFromTo(['.sources .chart2', '.sources .boxr1', '.sources .boxr2'], .5, {
        x: -100,
        y: 100
      }, {
        x: 0,
        y: 0
      }, 0.1);

      sources.add(_land2).add(_front2, .2).add(tree1, .2).add(tree2, .2).add(_boxeslTl, .2).add(pie, .4).add(bar, .4).add(bSquareS, .4).add(ySquareS, .4).add(bSquare, .4).add(line, .6);
    }
  } // products  


  if ($(window).scrollTop() > $('#products').offset().top) {
    if (state !== 'products') {
      var _sources = new TimelineMax();

      var _title3 = TweenMax.fromTo('.products .title-bg', .5, titleFadeBackInit, titleFade);

      var _land3 = TweenMax.fromTo('.products .land', .5, fadeInInit, fadeIn);

      var focuslb = TweenMax.fromTo('.products .focuslb', .5, {
        x: -100,
        y: 100
      }, {
        x: 0,
        y: 0
      });
      var focusrt = TweenMax.fromTo('.products .focusrt', .5, {
        x: 100,
        y: -100
      }, {
        x: 0,
        y: 0
      });
      var chartc = TweenMax.fromTo('.products .chartc', fadeInInit, fadeIn);
      var chartTl = new TimelineMax();
      var charttw = TweenMax.fromTo('.products .charttw', .5, {
        x: -200,
        y: -100,
        opacity: 0
      }, {
        x: 0,
        y: 0,
        opacity: 1
      });
      var chartus = TweenMax.fromTo('.products .chartus', .5, {
        x: 200,
        y: -100,
        opacity: 0
      }, {
        x: 0,
        y: 0,
        opacity: 1
      });
      chartTl.add(charttw, 0).add(chartus, 0);

      var _bar = TweenMax.fromTo('.products .bar img', .5, growInInit, growIn);

      var coin = TweenMax.fromTo('.products .coin', .5, fadeInInit, fadeIn);

      var _pie = TweenMax.fromTo('.products .pie', .5, fadeInInit, fadeIn);

      var arrow = TweenMax.fromTo('.products .arrow img', .5, growInInit, growIn);
      var bbox = TweenMax.fromTo('.products .bbox img', .5, growInInit, growIn);
      var bbox2 = TweenMax.fromTo('.products .bbox2', .5, fadeInInit, fadeIn);
      var ybox = TweenMax.fromTo('.products .ybox', .5, fadeInInit, fadeIn);

      _sources.add(_land3).add(chartc).add(chartTl, .4);
    }
  }
}); // menu

var mySwiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  slidesPerView: 'auto',
  observeParents: true,
  spaceBetween: 50,
  observer: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 3000
  }
}); // Q&A 

$('.menu__item').mouseover(function() {
  $(this).children('.menu__hoverBox').show();
});
$('.menu__item').mouseout(function() {
  $(this).children('.menu__hoverBox').hide();
}); // Q&A 

$('.question').click(function() {
  console.log($(this));

  if ($(this).hasClass('open')) {
    $(this).children('.answer').addClass('hidden');
    $(this).removeClass('open');
  } else {
    $(this).children('.answer').removeClass('hidden');
    $(this).addClass('open');
  }
}); // utlis 

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}