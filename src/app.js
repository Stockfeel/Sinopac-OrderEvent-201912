const prevScrollpos = window.pageYOffset;
window.onscroll = () => {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.querySeletor(".tab").style.top = "0";
  } else {
    document.querySeletor(".tab").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

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
    y: -2990,
    x: Math.random() > 0.5 ? 100 : -100,
    repeatDelay: randomBetween(1,3),
    ease: Linear.easeNone
  })
  tl.fromTo(selector, 2, {opacity: 1}, {opacity: 0});

  return tl 
}

// animation setting
let state = 'landing';
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
  opacity: 0
}
const growIn = {
  y: 0,
  opacity: 1,
  ease: Circ.easeInOut
}
const scaleInInit = {
  scale: 0,
  opacity: 0
}
const scaleIn = {
  scale: 1,
  opacity: 1,
  ease: Circ.easeInOut
}
const titleFadeInit = {
  x: 200,
  opacity: 0
}
const titleFadeBackInit = {
  x: -200,
  opacity: 0
}
const titleFade = {
  x: 0,
  opacity: 1,
  ease: Circ.easeInOut
}

function landingAnimation() {
  const landing = new TimelineMax() 
  const selector = Array(10).fill(0).map((item, idx) => `.landing__title img:nth-child(${idx + 1})`)
  landing.staggerFromTo(selector, .1, {
    y: 100
  }, {
    y: 0
  }, .1)
}

$(window).ready(function() {
  landingAnimation() 
  fetch('https://www.stockfeel.com.tw/wp-content/themes/stockfeel_2016_theme/api/get_industrychain.php')
    .then(res => res.json())
    .then(data => {
      if(data.status === 'success') {
        appendData(data.result)
        swiperBind()
      }
    })
})


// Menu
document.querySelector('.menu').addEventListener('mouseover', (evt) => {
  if(evt.target.classList.contains('swiper-slide')) {
    evt.target.querySelector('.menu__hoverBox').classList.remove('hidden')
  }
  if(evt.target.classList.contains('btn-small')) {
    evt.target.parentNode.classList.remove('hidden')
  }
  mySwiper.autoplay.stop()
})

document.querySelector('.menu').addEventListener('mouseout', (evt) => {
  if(evt.target.classList.contains('swiper-slide')) {
    evt.target.querySelector('.menu__hoverBox').classList.add('hidden')
  }
  if(evt.target.classList.contains('btn-small')) {
    evt.target.parentNode.classList.add('hidden')
  }
  mySwiper.autoplay.start()
})

let mySwiper;
function swiperBind() {
  mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    slidesPerView: 'auto',
    observeParents:true,
    spaceBetween: 50,
    observer: true,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 1000
    }
  })
}

function appendData(data) {
  const width = 60 
  const height = 20
  const result = Object.keys(data.change_row).map(item => {
    return {
      change: data.change_row[item].slice(0, 6), 
      meta: data.meta_row.find(ele => ele.category === item)
    }
  })
  result.forEach(item => {
    const node = document.querySelector(`[data-name="${item.meta.id}"]`);
    const mean = (item.change.reduce((acc, item) => acc + item) / item.change.length).toFixed(2)
    const yExtent = d3.extent(item.change)
    const xScale = d3.scaleLinear().domain([0, item.change.length]).range([0, width])
    const yScale = d3.scaleLinear().domain(yExtent).range([height, 0])
    const line = d3.line()
      .x((d, idx) => xScale(idx))
      .y((d) => yScale(d))
    const lines = line(item.change)
    if(node) {
      node.querySelector('.rtBox').innerHTML = item.meta.description.slice(0, 20)+'...'
      node.querySelector('.lbBox').innerHTML = `
        <p class='box__title'>近一月</p>
        <p class='box__info ${mean > 0 ? 'up' : 'down'}'>${mean} %</p>
        <svg width="${width}" height="${height}">
          <path d="${lines}" stroke='#4d4d4d' stoke-width='1px' fill='none'></path>
        </svg>
      `
      // node.querySelector('.btn-small').setAttribute('href', )
      node.querySelector('.btn-small').addEventListener('click', () => {
        window.open(`https://www.stockfeel.com.tw/industrychain/?class=${item.meta.category}`, '_blank');
      })
    }
  })
}

function industryTime() {
  const industry = new TimelineMax({ paused: true }) 
  const title = TweenMax.fromTo('.industry .title-bg', .5, titleFadeInit, titleFade)
  const front = TweenMax.fromTo('.industry .front img', 1, growInInit, growIn)
  const machine = TweenMax.fromTo('.industry .machine img', 1, growInInit, growIn)
  const building = TweenMax.fromTo('.industry .building img', 1, growInInit, growIn)
  const coin1 = TweenMax.fromTo('.industry .coin1', .5, fadeInDropInit, fadeIn)
  const coin2 = TweenMax.fromTo('.industry .coin2', .5, fadeInDropInit, fadeIn)
  const coin3 = TweenMax.fromTo('.industry .coin3 img', 1, growInInit, growIn)
  const wifi = TweenMax.fromTo('.industry .wifi', 1, fadeInInit, fadeIn)
  const chart2 = TweenMax.fromTo('.industry .chart2 img', 1, growInInit, growIn)
  const chart3 = TweenMax.fromTo('.industry .chart3 img', 1, growInInit, growIn)
  const airplane = TweenMax.fromTo('.industry .airplane', 2, {
    x: -100,
    y: 0,
    opacity: 0
  }, {
    x: 250,
    y: -350,
    opacity: 1,
    ease: Linear.easeNone
  })
  const chart1 = TweenMax.fromTo('.industry .chart1', 1, {
    y: 50,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    ease: Linear.easeNone,
    yoyo: true,
    repeat: -1
  }).pause()
  const busTl = new TimelineMax({ paused: true })
  const busDrop = TweenMax.fromTo('.industry .bus', .5, {
    y: -300,
    rotation: -10,
    opacity: 0,
  }, {
    y: 0,
    opacity: 1,
    ease: Linear.easeIn,
  })
  const busLand = TweenMax.to('.industry .bus', .1, {
    rotation: 0,
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

  industry.add(title)
    .add(coin1, .4)
    .add(coin2, .6)
    .add(building, .8)
    .add(machine, 1)
    .add(front, 1.2)
    .add(wifi, 1.4)
    .add(airplane, 1.4)
    .add(coin3, 1.4)
    .add(chart3, 1.6)
    .add(chart2, 1.6)
    .add(chart1, 1.6)

  return [industry, busTl, chart1];
}

function investTime() {
  const invest = new TimelineMax({ paused:true }) 
  const title = TweenMax.fromTo('.invest .title-bg', .5, titleFadeBackInit, titleFade)
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
  const boxeslTl = new TimelineMax({ paused:true });
  boxeslTl.fromTo('.invest .boxl1', {
    x: 0, 
    y: 0,
    opacity: 0
  }, {
    x: 40, 
    y: -40,
    opacity: 1
  })
  boxeslTl.fromTo('.invest .boxl2', {
    x: 0, 
    y: 0,
    opacity: 0
  }, {
    x: 20, 
    y: -40,
    opacity: 1
  })
  boxeslTl.staggerFromTo([
    '.invest .boxl1',
    '.invest .boxl2',
    '.invest .boxl3'
  ], 1, {
    y: -20,
    opacity: 0
  }, {
    y: 0,
    opacity: 1,
    ease: Linear.easeNone,
    yoyo: true,
    repeat: -1
  }, 0.1)
  const boxesrTl = new TimelineMax({ paused:true });
  boxesrTl.fromTo('.invest .boxr1', {
    x: 0, 
    y: 0,
    opacity: 0
  }, {
    x: -40, 
    y: 20,
    opacity: 1
  })
  boxesrTl.staggerFromTo([
    '.invest .boxr1',
    '.invest .boxr2',
  ], 1, {
    y: 0,
    opacity: 0
  }, {
    y: 10,
    opacity: 1,
    ease: Linear.easeNone,
    yoyo: true,
    repeat: -1
  }, 0.1)
  const circlesTl = new TimelineMax({ paused:true });
  circlesTl.staggerFromTo([
    '.invest .circle1',
    '.invest .circle2',
    '.invest .circle3'
  ], 1, {
    scale: 0.8,
    opacity: 0
  }, {
    scale: 1,
    opacity: 1,
    ease: Linear.easeNone,
    yoyo: true,
    repeat: -1
  }, 0.2)
  invest.add(title)
    .add(coin3, .2)
    .add(coin2, .4)
    .add(coin1, .6)
    .add(wall, .8)
    .add(other, 1)
    .add(time, 1)
    .add(front, 1.2)
    .add(plant, 1.2)
    .add(center, 1.2)
    .add(boxesrTl, 1.2)
    .add(cancel, 1.4)
    .add(check, 1.4)
  return [invest, boxeslTl, boxesrTl, circlesTl];
}

function sourceTime() {
  const sources = new TimelineMax({ paused:true }) 
  const title = TweenMax.fromTo('.sources .title-bg', .5, titleFadeInit, titleFade)
  const front = TweenMax.fromTo('.sources .front img', .5, growInInit, growIn) 
  const tree1 = TweenMax.fromTo('.sources .tree1 img', .5, growInInit, growIn) 
  const tree2 = TweenMax.fromTo('.sources .tree2 img', .5, growInInit, growIn) 
  const pie = TweenMax.fromTo('.sources .pie', .5, fadeInInit, fadeIn)
  const bar = TweenMax.fromTo('.sources .bar', .5, fadeInInit, fadeIn)
  const bSquareS = TweenMax.fromTo('.sources .bSquareS', .5, fadeInInit, fadeIn)
  const ySquareS = TweenMax.fromTo('.sources .ySquareS', .5, fadeInInit, fadeIn)
  const bSquare = TweenMax.fromTo('.sources .bSquare', .5, fadeInInit, fadeIn)
  const gSquare = TweenMax.fromTo('.sources .gSquare', .5, fadeInInit, fadeIn)
  const line = TweenMax.fromTo('.sources .line img', .5, growInInit, growIn)
  const img1 = TweenMax.fromTo('.sources .img1', .5, fadeInInit, fadeIn)
  const img2 = TweenMax.fromTo('.sources .img2', .5, fadeInInit, fadeIn)
  const house = TweenMax.fromTo('.sources .house img', .5, growInInit, growIn)
  const mountain = TweenMax.fromTo('.sources .mountain img', .5, growInInit, growIn)
  const pen = TweenMax.fromTo('.sources .pen', .5, fadeInInit, fadeIn)
  const video = TweenMax.fromTo('.sources .video', .5, fadeInInit, fadeIn)
  const book = TweenMax.fromTo('.sources .book', .5, fadeInInit, fadeIn)


  const boxeslTl = new TimelineMax({pause: true});
  boxeslTl.staggerFromTo([
    '.sources .chart1', 
    '.sources .boxl1', 
    '.sources .boxl2'
  ], .5, {
    x: -100,
    y: 100,
    opacity: 0
  }, {
    x: 0,
    y: 0,
    opacity: 1
  }, 0.1)
  boxeslTl.staggerFromTo([
    '.sources .chart2', 
    '.sources .boxr1', 
    '.sources .boxr2'
  ], .5, {
    x: -100,
    y: 100,
    opacity: 0
  }, {
    x: 0,
    y: 0,
    opacity: 1 
  }, 0.1)

  sources.add(title)
    .add(front, .2)
    .add(tree1, .2)
    .add(tree2, .2)
    .add(boxeslTl, .2)
    .add(mountain, .2)
    .add(pie, .4)
    .add(bar, .4)
    .add(bSquareS, .4)
    .add(ySquareS, .4)
    .add(bSquare, .4)
    .add(gSquare, .4)
    .add(line, .6)
    .add(house, .6)
    .add(img1, .8)
    .add(img2, .8)
    .add(pen, .8)
    .add(video, .8)
    .add(book, .8)

  return [sources, boxeslTl];
}

function productsTime() {
  const products = new TimelineMax({ paused:true }) 
  const title = TweenMax.fromTo('.products .title-bg', .5, titleFadeBackInit, titleFade)
  const focuslb = TweenMax.fromTo('.products .focuslb', .5, {
    x: -100,
    y: 100,
    opacity: 0
  }, {
    x: 0,
    y: 0,
    opacity: 1
  })
  const focusrt = TweenMax.fromTo('.products .focusrt', .5, {
    x: 100,
    y: -100,
    opacity: 0
  }, {
    x: 0,
    y: 0,
    opacity: 1
  })
  const chartc = TweenMax.fromTo('.products .chartc', fadeInInit, fadeIn);
  const bar = TweenMax.fromTo('.products .bar img', .5, growInInit, growIn)
  const coin = TweenMax.fromTo('.products .coin', .5, fadeInInit, fadeIn)
  const pie = TweenMax.fromTo('.products .pie', .5, fadeInInit, fadeIn)
  const arrow = TweenMax.fromTo('.products .arrow img', .5, growInInit, growIn)
  const bbox = TweenMax.fromTo('.products .bbox img', .5, growInInit, growIn)
  const bbox2 = TweenMax.fromTo('.products .bbox2', .5, fadeInInit, fadeIn)
  const ybox = TweenMax.fromTo('.products .ybox', .5, fadeInInit, fadeIn)
  const mouse = TweenMax.fromTo('.products .mouse', .5, fadeInInit, fadeIn)

  const chartTl = new TimelineMax({ paused:true }) 
  const charttw = TweenMax.fromTo('.products .charttw', .5, {
    x: -200,
    y: -100,
    opacity: 0
  }, {
    x: 0,
    y: 0,
    opacity: 1
  })
  const chartus = TweenMax.fromTo('.products .chartus', .5, {
    x: 200,
    y: -100,
    opacity: 0
  }, {
    x: 0,
    y: 0,
    opacity: 1
  })
  chartTl.add(charttw, 0)
    .add(chartus, 0)

  products.add(title)
    .add(focuslb, .2)
    .add(focusrt, .2)
    .add(chartc, .2)
    .add(pie, .2)
    .add(bar, .4)
    .add(coin, .4)
    .add(arrow, .4)
    .add(bbox, .4)
    .add(bbox2, .4)
    .add(ybox, .6)
    .add(mouse, .8)

  return [products, chartTl] 
}

// animation
const industry = industryTime();
const invest = investTime();
const source = sourceTime();
const products = productsTime();

$(window).scroll(function(evt) {
  if($(window).scrollTop() < $('#industry').offset().top && state !== 'landing') {
    state = 'landing';
  }
  if($(window).scrollTop() > $('#industry').offset().top - 300 && 
      $(window).scrollTop() < $('#menu').offset().top) {
    if(state !== 'industry') {
      state = 'industry';
      industry.forEach(tl => tl.play())
    }
    const sectionHeight = $('#industry').offset().top-$('#menu').offset().top;
  }
  if($(window).scrollTop() > $('#invest').offset().top - 300 && 
      $(window).scrollTop() < $('#sources').offset().top && 
      state !== 'invest') {
    state = 'invest';
    invest.forEach(tl => tl.play())
  }
  if($(window).scrollTop() > $('#sources').offset().top - 500 &&
      $(window).scrollTop() < $('#products').offset().top && 
      state !== 'sources') {
    state = 'sources';
    source.forEach(tl => tl.play())
  }
  if($(window).scrollTop() > $('#products').offset().top - 500 && 
      $(window).scrollTop() < $('#sales').offset().top &&
      state !== 'products') {
    state = 'products';
    products.forEach(tl => tl.play())
  }
})

// Q&A 
document.querySelector('.sales__question').addEventListener('click', (evt) => {
  let node = evt.target;
  if(node.classList.contains('question') || node.parentNode.classList.contains('question')) {
    if(node.parentNode.classList.contains('question')) node = node.parentNode;
    if(node.classList.contains('open')) {
      node.querySelector('.answer').classList.add('hidden')
      node.classList.remove('open')
    } else {
      node.querySelector('.answer').classList.remove('hidden')
      node.classList.add('open')
    }
  }
})

// utlis 
function randomBetween(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

