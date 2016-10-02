function initMap() {
  var myLatLng = {lat: {{page.lat}}, lng: {{page.lon}}};

  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    //styles: styleArray,
    zoom: {{page.zoom}},

  });

  // Create a marker and set its position.
  var marker = new google.maps.Marker({
    map: map,
    position: myLatLng,
    title: '{{page.title}}'
  });
}
