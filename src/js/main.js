const tag = document.createElement("script")
tag.src = "https://unpkg.com/@reactivex/rxjs@latest/dist/global/Rx.min.js"
document.getElementsByTagName("head")[0].appendChild(tag)
window.addEventListener("load", function load(){
    window.removeEventListener("load", load, false)
    init()
},false)

const init = () => {

const iW = window.innerWidth

  // LANDING PAGE
if (document.querySelector('.landing') !== null) {
  const landing = document.querySelector('.landing')
  // landing.style.maxHeight = `${window.innerHeight}px`
  landing.style.minHeight = `${window.innerHeight}px`

  window.addEventListener('resize', () => {
    // landing.style.maxHeight = `${window.innerHeight}px`
    landing.style.minHeight = `${window.innerHeight}px`

})
if (iW >= 1024) {
  const docElm = document.documentElement,
  cardElm = document.querySelector('#landing'),
  { clientWidth, clientHeight } = docElm,
  mouseMove$ = Rx.Observable
  .fromEvent(docElm, 'mousemove')
  .map(event => ({ x: event.clientX, y: event.clientY })),

  touchMove$ = Rx.Observable
  .fromEvent(docElm, 'touchmove')
  .map(event => ({
    x: event.touches[0].clientX,
    y: event.touches[0].clientY
  })),

  lerp = (start, end) => {
    const dx = end.x - start.x,
    dy = end.y - start.y

    return {
      x: start.x + dx * 0.8,
      y: start.y + dy * 0.8,
    };
  }

  const move$ = Rx.Observable.merge(mouseMove$, touchMove$),
  animationFrame$ = Rx.Observable.interval(0, Rx.Scheduler.animationFrame),

  smoothMove$ = animationFrame$
  .withLatestFrom(move$, (tick, move) => move)
  .scan(lerp);

  smoothMove$.subscribe(pos => {
    const rotX = (pos.y / clientHeight * -50) + 25,
    rotY = (pos.x / clientWidth * 50) - 25

    cardElm.style.cssText = `transform: rotateX(${rotX}deg) rotateY(${rotY}deg);`
  })
}



  const intro = document.querySelector('#intro'),
        meText = document.querySelector('#me-text'),
        name = document.querySelector('#name')

  //----------------------- SET AGE -----------------------//
  let getAge = (dateString) => {
      let today = new Date(),
          birthDate = new Date(dateString),
          age = today.getFullYear() - birthDate.getFullYear(),
          m = today.getMonth() - birthDate.getMonth()

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {age--}
      return age
  }

  document.querySelector('#age').innerText = getAge('1994.12.17')

  //----------------------- SET AGE -----------------------//


  intro.addEventListener('click', () => {
    // window.history.pushState('more','more','/more')
    meText.classList.remove('rotated-left')
    intro.classList.add('rotated-right')
    if (iW <= 768) {
      name.style.visibility = 'hidden'
    }
  })

  meText.addEventListener('click', () => {
    // window.history.back()
    intro.classList.remove('rotated-right')
    meText.classList.add('rotated-left')
    if (iW <= 768) {
      name.style.visibility = 'visible'
    }
  })

  // let handleMouseMove = (e) => {
  //   let x = e.clientX,
  //   y = e.clientY
  //   card.style.margin = `${iH/20 + y/20}px 0`
  //   // landing.style.minWidth = `${55+ x/100}vw`
  // }
  // if (window.matchMedia('(hover:hover)').matches) {
  //   document.onmousemove = handleMouseMove
  // }


}

// PHOTO POSTS
if (document.querySelector('.photo') !== null) {
  alert = (text, x, y) => {
    if (document.querySelector('#copyright') === null) {
      const alertBox = document.createElement('div'),
            alertText = document.createTextNode(text)
      alertBox.setAttribute('id','copyright')
      alertBox.setAttribute('style', `top: ${y}px; left: ${x}px`)
      alertBox.appendChild(alertText)
      document.body.insertBefore(alertBox, document.body.children[0])
      setTimeout(() => {
        document.querySelector('#copyright').remove()
      }, 2000)
    }
  }
  const backButton = document.querySelector('#post-photo footer'),
        contentImg = document.querySelector('#content-img img'),
        bgImg = document.querySelector('#bg-img img')

  contentImg.addEventListener('contextmenu', (e) => {
    alert(`Plase, don't! - © Balázs Orbán - Thank you!`, e.clientX, e.clientY)
    e.preventDefault()
  })
  if (iW < 768) {
    backButton.style.top = `${contentImg.height}px`
  }

  bgImg.setAttribute("src", contentImg.getAttribute("src"))

}

if (document.querySelectorAll('header').length !== 0) {
  const menuElements = document.querySelectorAll('a span')

  if (window.location.href.includes('photo')) {
    menuElements[1].style.color= 'rgb(173, 47, 0)'
  }
  else if (window.location.href.includes('code')) {
    menuElements[0].style.color= 'rgb(173, 47, 0)'
  }

}

  // menu = document.querySelector('.hamburger-menu'),
  // menu.addEventListener('click', () => {
  //   menu.classList.toggle('grow')
  // })
  //


}
