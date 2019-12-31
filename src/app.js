// landing
const landing = new TimelineMax()
for(let i = 0; i < 10; i += 1) {
  const elem = document.querySelector(`.ball:nth-child(${i+1})`)
  landing.add(originTrack(elem, [30, 40]), i*8)
}

const bgBall = new TimelineMax()
for(let i = 0; i < 10; i += 1) {
  const elem = document.querySelector(`.bgBall:nth-child(${i+1})`)
  bgBall.add(originTrack(elem, [10, 20]), i*1.5)
}

function originTrack(selector, [min, max]) {
  const tl = new TimelineMax({repeat: -1})
  tl.set(selector, {opacity: 0})
  tl.fromTo(selector, 2, {opacity: 0}, {opacity: 1})
  tl.to(selector, randomBetween(min, max), {
    y: -1500,
    x: Math.random() > 0.5 ? 100 : -100,
    repeatDelay: randomBetween(1,3),
    ease: Linear.easeNone
  })
  tl.fromTo(selector, 2, {opacity: 1}, {opacity: 0});

  return tl 
}

// animation setting
let state = null;
const fadeInInit = {
  y: -100,
  opacity: 0
}
const fadeInDropInit = {
  y: -100,
  opacity: 0
}
const fadeIn = {
  y: 0,
  opacity: 1,
  ease: Circ.easeInOut
}
const growInInit = {
  y: 300,
  opacity: 1
}
const growIn = {
  y: 0,
  opacity: 1,
  ease: Circ.easeInOut
}
const scaleInInit = {
  scale: 0,
  opacity: 1
}
const scaleIn = {
  scale: 1,
  opacity: 1,
  ease: Circ.easeInOut
}

// section animation
$(window).scroll(function(evt) {
  if($(window).scrollTop() < $('#industry').offset().top && state !== 'landing') {
    state = 'landing';
  }

  // industry 
  if($(window).scrollTop() > $('#industry').offset().top && $(window).scrollTop() < $('#menu').offset().top) {
    if(state !== 'industry') {
      state = 'industry';
      const industry = new TimelineMax() 
      const land = TweenMax.fromTo('.industry .land', .5, fadeInInit, fadeIn)
      const front = TweenMax.fromTo('.industry .front img', 1, growInInit, growIn)
      const machine = TweenMax.fromTo('.industry .machine img', 1, growInInit, growIn)
      const building = TweenMax.fromTo('.industry .building img', 1, growInInit, growIn)
      const coin1 = TweenMax.fromTo('.industry .coin1', .5, fadeInDropInit, fadeIn)
      const coin2 = TweenMax.fromTo('.industry .coin2', .5, fadeInDropInit, fadeIn)
      const coin3 = TweenMax.fromTo('.industry .coin3 img', 1, growInInit, growIn)
      const chart3 = TweenMax.fromTo('.industry .chart3 img', 1, growInInit, growIn)
      const busTl = new TimelineMax()
      const busDrop = TweenMax.fromTo('.industry .bus', .5, {
        y: -300,
        opacity: 0,
        rotation: -10
      }, {
        y: 0,
        opacity: 1,
        ease: Linear.easeIn,
      })
      const busLand = TweenMax.to('.industry .bus', .1, {
        rotation: 0,
        opacity: 1,
        ease: Linear.easeIn,
      })
      const bus = TweenMax.fromTo('.industry .bus', 5, {
        x: 0,
        ease: Linear.easeNone,
      },{
        x: 400,
        ease: Linear.easeNone,
      })
      busTl.add(busDrop).add(busLand).add(bus)
      const chart1 = TweenMax.fromTo('.industry .chart1', 1, {
        y: 50,
        opacity: 1
      }, {
        y: 0,
        opacity: 1,
        ease: Linear.easeNone,
        yoyo: true,
        repeat: -1
      })

      industry.add(land)
      industry.add(bus)
      industry.add(coin1, .2)
      industry.add(coin2, .4)
      industry.add(building, .6)
      industry.add(machine, .8)
      industry.add(front, 1)
      industry.add(coin3, 1.2)
      industry.add(chart3, 1.4)
    }
    const airplane = TweenMax.fromTo('.industry .airplane', 2, {
      x: -100,
      y: 0,
      opacity: 1
    }, {
      x: 100,
      y: -200,
      opacity: 1,
      ease: Linear.easeNone
    }).pause()
    const sectionHeight = $('#industry').offset().top-$('#menu').offset().top;
    airplane.progress(Math.abs(($(window).scrollTop()-$('#industry').offset().top)/sectionHeight)*2)
  }

  // invest 
  if($(window).scrollTop() > $('#invest').offset().top) {
    if(state !== 'invest') {
      state = 'invest';
      const invest = new TimelineMax() 
      const land = TweenMax.fromTo('.invest .land', .5, fadeInInit, fadeIn)
      const wall = TweenMax.fromTo('.invest .wall', .5, fadeInInit, fadeIn)
      const other = TweenMax.fromTo('.invest .other', .5, fadeInInit, fadeIn)
      const front = TweenMax.fromTo('.invest .front img', 1, growInInit, growIn)
      const coin1 = TweenMax.fromTo('.invest .coin1', .5, fadeInDropInit, fadeIn)
      const coin2 = TweenMax.fromTo('.invest .coin2', .5, fadeInDropInit, fadeIn)
      const coin3 = TweenMax.fromTo('.invest .coin3', .5, fadeInDropInit, fadeIn)
      const time = TweenMax.fromTo('.invest .time', 1, fadeInDropInit, fadeIn)
      const center = TweenMax.fromTo('.invest .boxc1 img', 1, growInInit, growIn)
      const plant = TweenMax.fromTo('.invest .plant img', 1, growInInit, growIn)
      const cancel = TweenMax.fromTo('.invest .cancel', 1, scaleInInit, scaleIn)
      const check = TweenMax.fromTo('.invest .check', 1, scaleInInit, scaleIn)
      const boxeslTl = new TimelineMax();
      boxeslTl.fromTo('.invest .boxl1', {
        x: 0, 
        y: 0,
      }, {
        x: 40, 
        y: -40,
      })
      boxeslTl.fromTo('.invest .boxl2', {
        x: 0, 
        y: 0,
      }, {
        x: 20, 
        y: -20,
      })
      boxeslTl.staggerFromTo([
        '.invest .boxl1',
        '.invest .boxl2',
        '.invest .boxl3'
      ], 1, {
        y: -20,
        opacity: 1
      }, {
        y: 0,
        opacity: 1,
        ease: Linear.easeNone,
        yoyo: true,
        repeat: -1
      }, 0.1)
      const boxesrTl = new TimelineMax();
      boxesrTl.fromTo('.invest .boxr1', {
        x: 0, 
        y: 0,
      }, {
        x: -40, 
        y: 20,
      })
      boxesrTl.staggerFromTo([
        '.invest .boxr1',
        '.invest .boxr2',
      ], 1, {
        y: 0,
        opacity: 1
      }, {
        y: 10,
        opacity: 1,
        ease: Linear.easeNone,
        yoyo: true,
        repeat: -1
      }, 0.1)
      const circlesTl = new TimelineMax();
      circlesTl.staggerFromTo([
        '.invest .circle1',
        '.invest .circle2',
        '.invest .circle3'
      ], 1, {
        scale: 0.8,
        opacity: 1
      }, {
        scale: 1,
        opacity: 1,
        ease: Linear.easeNone,
        yoyo: true,
        repeat: -1
      }, 0.2)
      invest.add(land)
        .add(coin3, .2)
        .add(coin2, .4)
        .add(coin1, .6)
        .add(wall, .8)
        .add(other, 1)
        .add(time, 1)
        .add(plant, 1.2)
        .add(center, 1.2)
        .add(boxesTl, 1.2)
        .add(cancel, 1.4)
        .add(check, 1.4)
    }
  }
})


// menu
const mySwiper = new Swiper ('.swiper-container', {
  slidesPerView: 'auto',
  loop: true,
  autoplay : 1000,
  pagination: '.swiper-pagination',
  nextButton: '.swiper-button-next',
  prevButton: '.swiper-button-prev',
})

// utlis 
function randomBetween(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}