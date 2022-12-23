const TIME_ANIMATION = 2000

const getParams = (id) => {
  const delay = TIME_ANIMATION * id
  const endDelay = 10000 - delay
  const translate = (250 + (200 * id)) * -1

  const value = {
    targets: `#text-${id} span`,
    duration: TIME_ANIMATION,
    easing: 'easeOutElastic',
    opacity: [0, 1],
    delay: (t, i) => (i * 40) + delay,
    endDelay,
    loop: true
  }

  if(id % 2 === 0) {
    value['translateX'] = [translate, 0]
  } else {
    value['translateY'] = [translate, 0]
  }

  return value
}

function startAnimation() {
  [0, 1, 2, 3, 4].map(idElement => {
    anime(getParams(idElement))
  })
}

startAnimation()



// * * * LEGACY * * *

const defaultParams2 = {
  duration: 2000,
  easing: 'easeOutElastic',
  opacity: [0, 1],
  loop: true,
}

function startingAnimation2() {
  // 12 = 2s duration + 0s delay + 10s endDelay
  anime({
    ...defaultParams,
    targets: '#text-1 span',
    delay: (t, i) => i * 40,
    endDelay: 10000,
    translateY: [-250, 0],
  })

  // 12s = 2s duration + 2s delay + 8s endDelay
  anime({
    ...defaultParams,
    targets: '#text-2 span',
    delay: (t, i) => (i * 40) + 2000,
    endDelay: 8000,
    translateY: [-450, 0],
  })

  // 12s = 2s duration + 4s delay + 6s endDelay
  anime({
    ...defaultParams,
    targets: '#text-3 span',
    delay: (t, i) => (i * 40) + 4000,
    endDelay: 6000,
    translateY: [-650, 0],
  })

  // 12s = 2s duration + 6s delay + 4s endDelay
  anime({
    ...defaultParams,
    targets: '#text-4 span',
    delay: (t, i) => (i * 40) + 6000,
    endDelay: 4000,
    translateY: [-850, 0],
  })

  // 12s = 2s duration + 8s delay + 2s endDelay
  anime({
    ...defaultParams,
    targets: '#text-5 span',
    delay: (t, i) => (i * 40) + 8000,
    endDelay: 2000,
    translateY: [-1050, 0],
  })
}

