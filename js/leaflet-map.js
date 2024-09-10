var map = L.map('map', {
    maxZoom: 5, //how many times you can zoom in
    minZoom: 1, //how many times it is zoomed in (displays from a distance)
    crs: L.CRS.Simple
}).setView([0,0], 1); 

// map.setMaxBounds(new L.LatLngBounds([0,1000], [500,0]));

var southWest = map.unproject([0, 0], map.getMaxZoom());
var northEast = map.unproject([2000, 0], map.getMaxZoom());
map.setMaxBounds(new L.LatLngBounds(southWest, northEast));

var imageUrl = 'https://globalassets.hunter.com/images/assets/align-adas-explainer.jpg/Zz05MDY4ZTgyYzVlMzQxMWVmODg1ZmI2ZDBjOGEzMDdmZA=='
var imageBounds = [[100,-100], [-100,100]]; //determines image centering placement

L.imageOverlay(imageUrl, imageBounds).addTo(map); 

// var circle = L.circle([51.508, -0.11], {
//     color: 'green',
//     fillColor: '#00C00C',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);

var polygon = L.polygon([
    [-37, 43], [37, 43], [0, 4.7]
]).addTo(map);


