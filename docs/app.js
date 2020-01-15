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
  opacity: 0
};
var growIn = {
  y: 0,
  opacity: 1,
  ease: Circ.easeInOut
};
var scaleInInit = {
  scale: 0,
  opacity: 0
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
  fetch('https://www.stockfeel.com.tw/wp-content/themes/stockfeel_2016_theme/api/get_industrychain.php').then(function(res) {
    return res.json();
  }).then(function(data) {
    if (data.status === 'success') {
      appendData(data.result);
      swiperBind();
    }
  });
}); // Menu

document.querySelector('.menu').addEventListener('mouseover', function(evt) {
  if (evt.target.classList.contains('menu__item')) {
    evt.target.querySelector('.menu__hoverBox').classList.remove('hidden');
  }

  mySwiper.autoplay.stop();
});
document.querySelector('.menu').addEventListener('mouseout', function(evt) {
  if (evt.target.classList.contains('menu__item')) {
    evt.target.querySelector('.menu__hoverBox').classList.add('hidden');
  }

  mySwiper.autoplay.start();
});
var mySwiper;

function swiperBind() {
  mySwiper = new Swiper('.swiper-container', {
    direction: 'horizontal',
    slidesPerView: 'auto',
    observeParents: true,
    spaceBetween: 50,
    observer: true,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 1000
    }
  });
}

function appendData(data) {
  var width = 60;
  var height = 20;
  var result = Object.keys(data.change_row).map(function(item) {
    return {
      change: data.change_row[item].slice(0, 6),
      meta: data.meta_row.find(function(ele) {
        return ele.category === item;
      })
    };
  });
  result.forEach(function(item) {
    var node = document.querySelector("[data-name=\"".concat(item.meta.id, "\"]"));
    var mean = (item.change.reduce(function(acc, item) {
      return acc + item;
    }) / item.change.length).toFixed(2);
    var yExtent = d3.extent(item.change);
    var xScale = d3.scaleLinear().domain([0, item.change.length]).range([0, width]);
    var yScale = d3.scaleLinear().domain(yExtent).range([height, 0]);
    var line = d3.line().x(function(d, idx) {
      return xScale(idx);
    }).y(function(d) {
      return yScale(d);
    });
    var lines = line(item.change);

    if (node) {
      node.querySelector('.rtBox').innerHTML = item.meta.description.slice(0, 20) + '...';
      node.querySelector('.lbBox').innerHTML = "\n        <p class='box__title'>\u8FD1\u4E00\u6708</p>\n        <p class='box__info ".concat(mean > 0 ? 'up' : 'down', "'>").concat(mean, " %</p>\n        <svg width=\"").concat(width, "\" height=\"").concat(height, "\">\n          <path d=\"").concat(lines, "\" stroke='#4d4d4d' stoke-width='1px' fill='none'></path>\n        </svg>\n      "); // node.querySelector('.btn-small').setAttribute('href', )

      node.querySelector('.btn-small').addEventListener('click', function() {
        window.open("https://www.stockfeel.com.tw/industrychain/?class=".concat(item.meta.category), '_blank');
      });
    }
  });
}

function airplaneTime() {
  return TweenMax.fromTo('.industry .airplane', 2, {
    x: -100,
    y: 0,
    opacity: 0
  }, {
    x: 250,
    y: -350,
    opacity: 1,
    ease: Linear.easeNone
  }).pause();
}

function industryTime() {
  var industry = new TimelineMax({
    paused: true
  });
  var title = TweenMax.fromTo('.industry .title-bg', .5, titleFadeInit, titleFade);
  var front = TweenMax.fromTo('.industry .front img', 1, growInInit, growIn);
  var machine = TweenMax.fromTo('.industry .machine img', 1, growInInit, growIn);
  var building = TweenMax.fromTo('.industry .building img', 1, growInInit, growIn);
  var coin1 = TweenMax.fromTo('.industry .coin1', .5, fadeInDropInit, fadeIn);
  var coin2 = TweenMax.fromTo('.industry .coin2', .5, fadeInDropInit, fadeIn);
  var coin3 = TweenMax.fromTo('.industry .coin3 img', 1, growInInit, growIn);
  var wifi = TweenMax.fromTo('.industry .wifi', 1, fadeInInit, fadeIn);
  var chart2 = TweenMax.fromTo('.industry .chart2 img', 1, growInInit, growIn);
  var chart3 = TweenMax.fromTo('.industry .chart3 img', 1, growInInit, growIn);
  var chart1 = TweenMax.fromTo('.industry .chart1', 1, {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    ease: Linear.easeNone,
    yoyo: true,
    repeat: -1
  }).pause();
  var busTl = new TimelineMax({
    paused: true
  });
  var busDrop = TweenMax.fromTo('.industry .bus', .5, {
    y: -300,
    rotation: -10,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    ease: Linear.easeIn
  });
  var busLand = TweenMax.to('.industry .bus', .1, {
    rotation: 0,
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
  industry.add(title).add(coin1, .4).add(coin2, .6).add(building, .8).add(machine, 1).add(front, 1.2).add(wifi, 1.4).add(coin3, 1.4).add(chart3, 1.6).add(chart2, 1.6).add(chart1, 1.6);
  return [industry, busTl, chart1];
}

function investTime() {
  var invest = new TimelineMax({
    paused: true
  });
  var title = TweenMax.fromTo('.invest .title-bg', .5, titleFadeBackInit, titleFade);
  var wall = TweenMax.fromTo('.invest .wall', .5, fadeInInit, fadeIn);
  var other = TweenMax.fromTo('.invest .other', .5, fadeInInit, fadeIn);
  var front = TweenMax.fromTo('.invest .front img', 1, growInInit, growIn);
  var coin1 = TweenMax.fromTo('.invest .coin1', .5, fadeInDropInit, fadeIn);
  var coin2 = TweenMax.fromTo('.invest .coin2', .5, fadeInDropInit, fadeIn);
  var coin3 = TweenMax.fromTo('.invest .coin3', .5, fadeInDropInit, fadeIn);
  var time = TweenMax.fromTo('.invest .time', 1, fadeInDropInit, fadeIn);
  var center = TweenMax.fromTo('.invest .boxc1 img', 1, growInInit, growIn);
  var plant = TweenMax.fromTo('.invest .plant img', 1, growInInit, growIn);
  var cancel = TweenMax.fromTo('.invest .cancel', 1, scaleInInit, scaleIn);
  var check = TweenMax.fromTo('.invest .check', 1, scaleInInit, scaleIn);
  var boxeslTl = new TimelineMax({
    paused: true
  });
  boxeslTl.fromTo('.invest .boxl1', {
    x: 0,
    y: 0,
    opacity: 0
  }, {
    x: 40,
    y: -40,
    opacity: 1
  });
  boxeslTl.fromTo('.invest .boxl2', {
    x: 0,
    y: 0,
    opacity: 0
  }, {
    x: 20,
    y: -40,
    opacity: 1
  });
  boxeslTl.staggerFromTo(['.invest .boxl1', '.invest .boxl2', '.invest .boxl3'], 1, {
    y: -20,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    ease: Linear.easeNone,
    yoyo: true,
    repeat: -1
  }, 0.1);
  var boxesrTl = new TimelineMax({
    paused: true
  });
  boxesrTl.fromTo('.invest .boxr1', {
    x: 0,
    y: 0,
    opacity: 0
  }, {
    x: -40,
    y: 20,
    opacity: 1
  });
  boxesrTl.staggerFromTo(['.invest .boxr1', '.invest .boxr2'], 1, {
    y: 0,
    opacity: 0
  }, {
    y: 10,
    opacity: 1,
    ease: Linear.easeNone,
    yoyo: true,
    repeat: -1
  }, 0.1);
  var circlesTl = new TimelineMax({
    paused: true
  });
  circlesTl.staggerFromTo(['.invest .circle1', '.invest .circle2', '.invest .circle3'], 1, {
    scale: 0.8,
    opacity: 0
  }, {
    scale: 1,
    opacity: 1,
    ease: Linear.easeNone,
    yoyo: true,
    repeat: -1
  }, 0.2);
  invest.add(title).add(coin3, .2).add(coin2, .4).add(coin1, .6).add(wall, .8).add(other, 1).add(time, 1).add(front, 1.2).add(plant, 1.2).add(center, 1.2).add(boxesrTl, 1.2).add(cancel, 1.4).add(check, 1.4);
  return [invest, boxeslTl, boxesrTl, circlesTl];
}

function sourceTime() {
  var sources = new TimelineMax({
    paused: true
  });
  var title = TweenMax.fromTo('.sources .title-bg', .5, titleFadeInit, titleFade);
  var front = TweenMax.fromTo('.sources .front img', .5, growInInit, growIn);
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
  var pen = TweenMax.fromTo('.sources .pen', .5, fadeInInit, fadeIn);
  var video = TweenMax.fromTo('.sources .video', .5, fadeInInit, fadeIn);
  var book = TweenMax.fromTo('.sources .book', .5, fadeInInit, fadeIn);
  var boxeslTl = new TimelineMax({
    pause: true
  });
  boxeslTl.staggerFromTo(['.sources .chart1', '.sources .boxl1', '.sources .boxl2'], .5, {
    x: -100,
    y: 100,
    opacity: 0
  }, {
    x: 0,
    y: 0,
    opacity: 1
  }, 0.1);
  boxeslTl.staggerFromTo(['.sources .chart2', '.sources .boxr1', '.sources .boxr2'], .5, {
    x: -100,
    y: 100,
    opacity: 0
  }, {
    x: 0,
    y: 0,
    opacity: 1
  }, 0.1);
  sources.add(title).add(front, .2).add(tree1, .2).add(tree2, .2).add(boxeslTl, .2).add(mountain, .2).add(pie, .4).add(bar, .4).add(bSquareS, .4).add(ySquareS, .4).add(bSquare, .4).add(gSquare, .4).add(line, .6).add(house, .6).add(img1, .8).add(img2, .8).add(pen, .8).add(video, .8).add(book, .8);
  return [sources, boxeslTl];
}

function productsTime() {
  var products = new TimelineMax({
    paused: true
  });
  var title = TweenMax.fromTo('.products .title-bg', .5, titleFadeBackInit, titleFade);
  var focuslb = TweenMax.fromTo('.products .focuslb', .5, {
    x: -100,
    y: 100,
    opacity: 0
  }, {
    x: 0,
    y: 0,
    opacity: 1
  });
  var focusrt = TweenMax.fromTo('.products .focusrt', .5, {
    x: 100,
    y: -100,
    opacity: 0
  }, {
    x: 0,
    y: 0,
    opacity: 1
  });
  var chartc = TweenMax.fromTo('.products .chartc', fadeInInit, fadeIn);
  var bar = TweenMax.fromTo('.products .bar img', .5, growInInit, growIn);
  var coin = TweenMax.fromTo('.products .coin', .5, fadeInInit, fadeIn);
  var pie = TweenMax.fromTo('.products .pie', .5, fadeInInit, fadeIn);
  var arrow = TweenMax.fromTo('.products .arrow img', .5, growInInit, growIn);
  var bbox = TweenMax.fromTo('.products .bbox img', .5, growInInit, growIn);
  var bbox2 = TweenMax.fromTo('.products .bbox2', .5, fadeInInit, fadeIn);
  var ybox = TweenMax.fromTo('.products .ybox', .5, fadeInInit, fadeIn);
  var mouse = TweenMax.fromTo('.products .mouse', .5, fadeInInit, fadeIn);
  var chartTl = new TimelineMax({
    paused: true
  });
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
  products.add(title).add(focuslb, .2).add(focusrt, .2).add(chartc, .2).add(pie, .2).add(bar, .4).add(coin, .4).add(arrow, .4).add(bbox, .4).add(bbox2, .4).add(ybox, .6).add(mouse, .8);
  return [products, chartTl];
} // animation


var industry = industryTime();
var invest = investTime();
var source = sourceTime();
var products = productsTime();
var airplane = airplaneTime();
$(window).scroll(function(evt) {
  if ($(window).scrollTop() < $('#industry').offset().top && state !== 'landing') {
    state = 'landing';
  }

  if ($(window).scrollTop() > $('#industry').offset().top - 300 && $(window).scrollTop() < $('#menu').offset().top) {
    if (state !== 'industry') {
      state = 'industry';
      industry.forEach(function(tl) {
        return tl.play();
      });
    }

    var sectionHeight = $('#industry').offset().top - $('#menu').offset().top;
    airplane.progress(Math.abs(($(window).scrollTop() - $('#industry').offset().top) / sectionHeight) * 3.5);
  }

  if ($(window).scrollTop() > $('#invest').offset().top - 300 && $(window).scrollTop() < $('#sources').offset().top && state !== 'invest') {
    state = 'invest';
    invest.forEach(function(tl) {
      return tl.play();
    });
  }

  if ($(window).scrollTop() > $('#sources').offset().top - 500 && $(window).scrollTop() < $('#products').offset().top && state !== 'sources') {
    state = 'sources';
    source.forEach(function(tl) {
      return tl.play();
    });
  }

  if ($(window).scrollTop() > $('#products').offset().top - 500 && $(window).scrollTop() < $('#sales').offset().top && state !== 'products') {
    state = 'products';
    products.forEach(function(tl) {
      return tl.play();
    });
  }
}); // Q&A 

document.querySelector('.sales__question').addEventListener('click', function(evt) {
  var node = evt.target;

  if (node.classList.contains('question') || node.parentNode.classList.contains('question')) {
    if (node.parentNode.classList.contains('question')) node = node.parentNode;

    if (node.classList.contains('open')) {
      node.querySelector('.answer').classList.add('hidden');
      node.classList.remove('open');
    } else {
      node.querySelector('.answer').classList.remove('hidden');
      node.classList.add('open');
    }
  }
}); // utlis 

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}