window.addEventListener("load", function load(){
    window.removeEventListener("load", load, false)
    init()
},false)

const init = () => {

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
}
