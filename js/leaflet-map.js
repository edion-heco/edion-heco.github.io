// import { curve } from './leaflet.curve.js';

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


//Begin adding leaflet layers
// Example polygon: var polygon = L.polygon([[-37, 43], [37, 43], [0, 4.7]], {color: '#00C00C', fillColor:'#00C00C', fillOpacity: 0.5}).addTo(map);

//added using Mapped values
// let radars = new Map([
//     ["Front Facing Camera", [[-36, 86], [36, 86], [0, 9.2]]],
//     ["Second Radar", [[-60, -20], [40, -0], [0, -50]]],
// ]);

// looping through mapped values
// for (let [key, latlngs] of radars) {
//     var polygon = L.polygon(latlngs, {color: '#00C00C', fillColor:'#00C00C', fillOpacity: 0.25}).addTo(map);
//     polygon.bindPopup("I am a " + key);
//     // polygon.on('mouseover', function(e) {
//     //     ({color: '#C00C00'})
//     // };
// }

//OR added using GeoJSON format

var adas = [{
    "type" : "Feature", 
    "properties": {
        "adasType": "Radar",
        "name": "Front Facing Radar",
        "description": "A temporary short sentence about front facing radar technology.",
        "show_on_map": true
    }, 
    "geometry": {
        "type": "Polygon", 
        "coordinates": [[
            [86, 36],
            [86, -36],
            [9.2, 0]
        ]]
    } 
}, {
    "type" : "Feature", 
    "properties": {
        "adasType": "Camera",
        "name": "Rear Facing Camera",
        "description": "A temporary short sentence about rear facing camera technology.",
        "show_on_map": true
    }, 
    "geometry": {
        "type": "Polygon", 
        "coordinates": [[
            [-86, 36],
            [-50, 0],
            [-86, -36]
        ]]
    }
}];

    // ***Attempting to add curves to GeoJSON format***
    // "type" : "Feature", 
    // "properties": {
    //     "adasType": "Radar",
    //     "name": "Front Facing Radar",
    //     "description": "A temporary short sentence about front facing radar technology.",
    //     "show_on_map": true
    // }, 
    // "geometry": {
    //     "type": "Curve", 
    //     "coordinates": [[
    //         'M',[0, 9.2],
    // 'L',[36, 86],
    // 'C',[36, 86],[0, 110],[-36, 86],'Z'
    //     ]]
    // }

var geojson; 

function getColor(type) {
    return type == "Camera" ? '#C00C00' :
           type == "Radar"  ? '#00C00C' :
                      '#000000';
}

function style(feature) {
    return {
        // fillColor: getColor(feature.properties.adasType),
        // fillColor: '#EBEEF5',
        // color: getColor(feature.properties.adasType),
        color: '#EBEEF5',
        weight: 2,
        fillOpacity: 0.25,
        fill: true
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        fillOpacity: 0.5
    });

    layer.bringToFront();
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

// ***Semi-functional function to zoom in to the polygon that you click***
// function zoomToFeature(e) {
//     map.fitBounds(e.target.getBounds());
// }

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        // click: zoomToFeature
    });
    layer.bindPopup('<h1>'+ feature.properties.name + '</h1>&nbsp;<p>' + feature.properties.description + '</p>')
}


// ***FUNCTIONING CURVE without additional functions***
// var path = L.curve(['M',[0, 9.2],
//     'L',[36, 86],
//     'C',[36, 86],[0, 110],[-36, 86],'Z'],
//     {color:'yellow',fill:true}).addTo(map);

// ***FUNCTIONING CURVE***
// var path = L.curve(['M',[0, 9.2],
//     'L',[36, 86],
//     'C',[36, 86],[0, 110],[-36, 86],'Z'], {
//         filter: function(feature, layer) {
//             return feature.properties.show_on_map;
//         },
//         style: style,
//         onEachFeature: onEachFeature,
//         color: '#00C00C'
//     }).addTo(map);
 

var path = L.curve(['M', [0, 9.2], 'L',[36, 86], 'C',[36, 86],[0, 110],[-36, 86],'Z'], {
    filter: function(feature, layer) {
        return feature.properties.show_on_map;
    },
    style: style,
    onEachFeature: onEachFeature,
    // color: '#00C00C',
    fill: true
}).addTo(map); 

var renderedPath = document.getElementsByTagName('path')[0];
renderedPath.id = 'curve-path';

const newPath = document.getElementById('curve-path'); 
newPath.addEventListener("mouseover", (event) => {
    event.target.style.fill = "#000000"; 
    event.target.style.stroke = "#000000"; 
    event.target.bindPopup('<h1>Title</h1>&nbsp;<p>description</p>')
})

newPath.addEventListener("mouseout", (event) => {
    event.target.style.fill = "#00C00C"; 
    event.target.style.stroke = "#00C00C"; 
})


// console.log(adas); 
console.log(typeof(path)); 
console.log(path); 

// ***Adds geojson regular triangle polygons***
// var geojson = L.geoJson(adas, {
//     filter: function(feature, layer) {
//         return feature.properties.show_on_map;
//     },
//     style: style,
//     onEachFeature: onEachFeature,
// }).addTo(map);






