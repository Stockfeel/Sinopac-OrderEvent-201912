const industry = new TimelineMax()
for(let i = 0; i < 10; i += 1) {
  const elem = document.querySelector(`.ball:nth-child(${i+1})`)
  industry.add(originTrack(elem, [30, 40]), i*8)
}

const bgBall = new TimelineMax()
for(let i = 0; i < 10; i += 1) {
  const elem = document.querySelector(`.bgBall:nth-child(${i+1})`)
  bgBall.add(originTrack(elem, [10, 20]), i*2)
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

function randomBetween(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}