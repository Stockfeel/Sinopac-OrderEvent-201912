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
    y: -1500,
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


var state = null;
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
}; // section animation

$(window).scroll(function(evt) {
  if ($(window).scrollTop() < $('#industry').offset().top && state !== 'landing') {
    state = 'landing';
  } // industry 


  if ($(window).scrollTop() > $('#industry').offset().top && $(window).scrollTop() < $('#menu').offset().top) {
    if (state !== 'industry') {
      state = 'industry';
      var industry = new TimelineMax();
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
      industry.add(land);
      industry.add(bus);
      industry.add(coin1, .2);
      industry.add(coin2, .4);
      industry.add(building, .6);
      industry.add(machine, .8);
      industry.add(front, 1);
      industry.add(coin3, 1.2);
      industry.add(chart3, 1.4);
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
      invest.add(_land).add(_coin3, .2).add(_coin2, .4).add(_coin, .6).add(wall, .8).add(other, 1).add(time, 1).add(plant, 1.2).add(center, 1.2).add(boxesTl, 1.2).add(cancel, 1.4).add(check, 1.4);
    }
  }
}); // menu

var mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true
}); // utlis 

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}