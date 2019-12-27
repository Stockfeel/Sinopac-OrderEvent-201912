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

var industry = new TimelineMax();

for (var i = 0; i < 10; i += 1) {
  var elem = document.querySelector(".ball:nth-child(".concat(i + 1, ")"));
  industry.add(originTrack(elem, [30, 40]), i * 8);
}

var bgBall = new TimelineMax();

for (var _i = 0; _i < 10; _i += 1) {
  var _elem = document.querySelector(".bgBall:nth-child(".concat(_i + 1, ")"));

  bgBall.add(originTrack(_elem, [10, 20]), _i * 2);
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
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}