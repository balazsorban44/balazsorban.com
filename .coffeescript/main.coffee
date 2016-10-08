
#----------------------- include Google Analytics -----------------------#

((i, s, o, g, r, a, m) ->
  i['GoogleAnalyticsObject'] = r
  i[r] = i[r] or ->
    (i[r].q = i[r].q or []).push arguments
    return

  i[r].l = 1 * new Date
  a = s.createElement(o)
  m = s.getElementsByTagName(o)[0]
  a.async = 1
  a.src = g
  m.parentNode.insertBefore a, m
  return
) window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga'
ga 'create', 'UA-77916573-1', 'auto'
ga 'send', 'pageview'


#----------------------- include jQuery -----------------------#

script = document.createElement('script')
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js'
script.type = 'text/javascript'
document.getElementsByTagName('head')[0].appendChild script

#----------------------- ANIMATIONS -----------------------#

window.setTimeout (->
  $('.open').click ->
    $('#me-text').css 'transform':'rotateY(0deg)', 'opacity':'1', 'z-index':'1'
    $('#intro-text').css 'transform':'rotateY(-180deg)', 'opacity':'0', 'z-index':'-1'
  $('.close').click ->
    $('#me-text').css 'transform':'rotateY(180deg)', 'opacity':'0', 'z-index':'-1'
    $('#intro-text').css 'transform':'rotateY(0deg)', 'opacity':'1', 'z-index':'1'
  if window.matchMedia('(min-width: 1024px)').matches
    $('body').mousemove (event) ->
      $('#card').css('margin-left': event.pageX/20 + "px",'margin-top': event.pageY/20 + "px", 'margin-bottom': event.pageY/20 + "px")
  if window.matchMedia('(max-width: 640px)').matches
    $('.open').click ->
      $('#me').css 'opacity':'0'
      $('#name').css 'opacity':'0'
    $('.close').click ->
      $('#me').css 'opacity':'1'
      $('#name').css 'opacity':'1'
      ), 1000
