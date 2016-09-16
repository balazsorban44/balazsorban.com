(function() {
  var script;

  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
      (i[r].q = i[r].q || []).push(arguments);
    };
    i[r].l = 1 * new Date;
    a = s.createElement(o);
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-77916573-1', 'auto');

  ga('send', 'pageview');

  script = document.createElement('script');

  script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js';

  script.type = 'text/javascript';

  document.getElementsByTagName('head')[0].appendChild(script);

  window.setTimeout((function() {
    $('.open').click(function() {
      $('#about-me').css({
        'transform': 'rotateY(0deg)',
        'opacity': '1',
        'z-index': '1'
      });
      return $('#intro').css({
        'transform': 'rotateY(-180deg)',
        'opacity': '0',
        'z-index': '-1'
      });
    });
    $('.close').click(function() {
      $('#about-me').css({
        'transform': 'rotateY(180deg)',
        'opacity': '0',
        'z-index': '-1'
      });
      return $('#intro').css({
        'transform': 'rotateY(0deg)',
        'opacity': '1',
        'z-index': '1'
      });
    });
    if (window.matchMedia('(min-width: 1024px)').matches) {
      return $('.index').mousemove(function(event) {
        return $('#card').css({
          'margin-left': event.pageX / 20 + "px",
          'margin-top': event.pageY / 20 + "px",
          'margin-bottom': event.pageY / 20 + "px"
        });
      });
    }
  }), 1000);

}).call(this);

