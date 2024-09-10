var map = L.map('map', {
    maxZoom: 5, //how many times you can zoom in
    minZoom: 1, //how many times it is zoomed in (displays from a distance)
    crs: L.CRS.Simple
}).setView([0,0], 1); 

var southWest = map.unproject([0, 0], map.getMaxZoom());
var northEast = map.unproject([2000, 0], map.getMaxZoom());
map.setMaxBounds(new L.LatLngBounds(southWest, northEast));

var imageUrl = 'https://globalassets.hunter.com/images/assets/align-adas-explainer.jpg/Zz05MDY4ZTgyYzVlMzQxMWVmODg1ZmI2ZDBjOGEzMDdmZA=='
var imageBounds = [[100, -200], [-100, 200]]; //determines image centering placement and size

L.imageOverlay(imageUrl, imageBounds).addTo(map); 


//Adding leaflet layers
// Example polygon: var polygon = L.polygon([[-37, 43], [37, 43], [0, 4.7]], {color: '#00C00C', fillColor:'#00C00C', fillOpacity: 0.5}).addTo(map);

let radars = new Map([
    ["Front Facing Camera", [[-36, 86], [36, 86], [0, 9.2]]],
    ["Second Radar", [[-60, -20], [40, -0], [0, -50]]],
]);

for (let [key, latlngs] of radars) {
    var polygon = L.polygon(latlngs, {color: '#00C00C', fillColor:'#00C00C', fillOpacity: 0.25}).addTo(map);
    polygon.bindPopup("I am a " + key);
    // polygon.on('mouseover', function(e) {
    //     ({color: '#C00C00'})
    // };
}


