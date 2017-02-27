
//----------------------- INCLUDE Google Analytics -----------------------#

((i, s, o, g, r, a, m) => {
  i.GoogleAnalyticsObject = r
  i[r] = i[r] ||  function(){(i[r].q = i[r].q || []).push(arguments)}
  i[r].l = 1 * new Date()
  a = s.createElement(o)
  m = s.getElementsByTagName(o)[0]
  a.async = 1
  a.src = g
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')
ga('create', 'UA-77916573-1', 'auto')
ga('send', 'pageview')


//----------------------- SET AGE -----------------------#
function getAge(dateString) {
    let today = new Date(),
        birthDate = new Date(dateString),
        age = today.getFullYear() - birthDate.getFullYear(),
        m = today.getMonth() - birthDate.getMonth()

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}
document.querySelector('#age').innerText = getAge('1994.12.17')

//----------------------- SET AGE -----------------------#


const intro = document.querySelector('#intro'),
      meText = document.querySelector('#me-text'),
      open = document.querySelector('.open'),
      close = document.querySelector('.close'),
      card = document.querySelector('#card'),
      landing = document.querySelector('#landing'),
      iH = window.innerHeight


open.addEventListener('click', () => {
  // window.history.pushState('more','more','/more')
  meText.classList.remove('rotated-left')
  intro.classList.add('rotated-right')
})

close.addEventListener('click', () => {
  // window.history.back()
  intro.classList.remove('rotated-right')
  meText.classList.add('rotated-left')
})

if (window.matchMedia('(hover:hover)').matches) {
  document.onmousemove = handleMouseMove
}

function handleMouseMove(e){
  let x = e.clientX,
      y = e.clientY
  card.style.margin = `${iH/20 + y/20}px 0`
  landing.style.minWidth = `${70+ x/100}vw`
}

// const strength = 50
// let shouldMove = false
//
// document.querySelector('body').addEventListener('click', () => {
//   if (!shouldMove) {
//     shouldMove = true
//   }
//   else {
//     shouldMove = false
//   }
// })
// document.onmousemove = handleMouseMove
//
// function handleMouseMove(e){
//   if (shouldMove) {
//     let x = e.clientX,
//         y = e.clientY
//
//     if (y<iH/2) {
//       if (x<iW/2) {
//         card.transform =`
//           rotateX(${(y-iH/2)/strength}deg) rotateY(${(-(iW-x))/strength}deg)`
//       }
//       else {
//         card.transform =`
//           rotateX(${(y-iH/2)/strength}deg) rotateY(${x/strength}deg)`
//       }
//     }
//     else {
//       if (x<iW/2) {
//         card.transform =`
//           rotateX(${y/strength}deg) rotateY(${((x-iW)/2)/strength}deg)`
//       }
//       else {
//         card.transform =`
//           rotateX(${y/strength}deg) rotateY(${x/strength}deg)`
//       }
//     }
//   }
// }
