//ROUTING MACHINE CONTROL HERE:
var control = L.Routing.control({
  waypoints: [
      L.latLng(47.2595, -122.4489),
    ],
    routeWhileDragging: true,
    units: 'imperial',
    router: L.Routing.mapbox('pk.eyJ1IjoiZ21pcmVsZXMyMTAiLCJhIjoiY2puemlrN2gyMWZkczNra2IxaGJ0Zm1tZSJ9.MLx2_iXhq4cWBnXTK4j2Rg'),
    //Geocoder here:
    geocoder: L.Control.Geocoder.nominatim(),
}).addTo(map);

    //Pop-up on display of the map for first time. 
    //Thank you to Stackoverflow, GIS StackExchange and GitHub for help with making a pop-up that displays once, then disappears. 
    //This helped create a pop up next a set waypoint marker that gives a brief explanation of what to do with the marker since I wasn't able to attach two pop-ups to the same marker.
var popupLocation = new L.LatLng(47.260112, -122.448900);
var popupContent = '<p>Click on the map or drag this pin (located under this text box) to activate a START and END destination path.</p>',
popup = new L.Popup();
popup.setLatLng(popupLocation);
popup.setContent(popupContent);
    map.addLayer(popup);

//Waypoints btn's here:
    function createButton(label, container) {
        var btn = L.DomUtil.create('button', '', container);
        btn.setAttribute('type', 'button');
        btn.innerHTML = label;
        return btn;
    }

    map.on('click', function(e) {
        var container = L.DomUtil.create('div'),
          startBtn = createButton('Start from this location', container),
          destBtn = createButton('Go to this location', container);

        L.popup()
            .setContent(container)
            .setLatLng(e.latlng)
            .openOn(map);

          L.DomEvent.on(destBtn, 'click', function() {
            control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
            map.closePopup();
          });

          L.DomEvent.on(startBtn, 'click', function() {
                control.spliceWaypoints(0, 1, e.latlng);
                map.closePopup();
           });

});