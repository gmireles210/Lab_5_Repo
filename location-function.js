//LOCATION FUNCTION:
function locateFunction(){
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
    map.locate({
      setView: true, 
      maxZoom: 16, 
      timeout: 15000, 
      watch: false,
  })} else {
    alert('User denied web page access to location.')
  }  
}
function showPosition(position){ //Can't make it call from onLocationFound function. 
}

//Original code from TGIS 504 Lab4:

function onLocationFound(e) { 

  var radius = e.accuracy / 2; 

  var coordinates = e.latlng.lat + ", " + e.latlng.lng

  L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius / 3 + " feet of this point." + "<br>" + "Click on bottom tip of blue marker to use this location to use as a start waypoint.").openPopup();

  //L.circle(e.latlng, radius).addTo(map); // this adds a Leaflet circle to the map at the lat and long returned by the locate function. Its radius is set to the var radius defined above.

  //Couldn't get L.circle to work with start waypoint, so I changed it L.marker in order to show location and then use location as a start waypoint.
  if (radius > 30) {
      L.marker(e.latlng, radius, {color: 'green'}).addTo(map);
  }
  else{
      L.marker(e.latlng, radius, {color: 'red'}).addTo(map);
  } 
}

function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

//This specifies that the locate method should run
map.locate({
  setView: true, 
  maxZoom: 16, 
  timeout: 15000, 
  watch: false, 
});