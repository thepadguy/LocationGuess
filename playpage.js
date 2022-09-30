function positionElements() {
    //positioning background div underneath header div
    var header_div = document.getElementById("header_div");
    var background_div = document.getElementById("background_div");
    background_div.style.top = header_div.getBoundingClientRect().height;
    //positioning foreground div
    var foreground_div = document.getElementById("foreground_div");
    foreground_div.style.top = header_div.getBoundingClientRect().height;
    //setting up foreground_grid
    var col_width = window.innerWidth / 3;
    var row_height = (foreground_div.getBoundingClientRect().bottom - foreground_div.getBoundingClientRect().top) / 3;
    foreground_div.style.gridTemplateColumns = col_width + "px " + col_width + "px " + col_width + "px";
    foreground_div.style.gridTemplateRows = row_height + "px " + row_height + "px " + row_height + "px";
    foreground_div.style.height = (3 * row_height) + "px";
    //setting up "find_text" fond size and margin
    var find_text = document.getElementById("find_text");
    var nav_map_div = document.getElementById("nav_map_div");
    if (row_height <= col_width) {
        find_text.style.fontSize = (row_height / 4.7) + "px";
        for (let denom = 4.7; find_text.getBoundingClientRect().bottom >= nav_map_div.getBoundingClientRect().top; denom += 0.3) {
            find_text.style.fontSize = (row_height / denom) + "px";
            find_text.style.marginTop = (row_height - (find_text.getBoundingClientRect().bottom - find_text.getBoundingClientRect().top)) / 2;
            find_text.style.marginBottom = find_text.style.marginTop;
        }
    } else if (row_height > col_width) {
        find_text.style.fontSize = (col_width / 5) + "px";
        for (let denom = 5; find_text.getBoundingClientRect().bottom >= nav_map_div.getBoundingClientRect().top; denom += 0.3) {
            find_text.style.fontSize = (col_width / denom) + "px";
            find_text.style.marginTop = (row_height - (find_text.getBoundingClientRect().bottom - find_text.getBoundingClientRect().top)) / 2;
            find_text.style.marginBottom = find_text.style.marginTop;
        }
    }
    //set nav_map_div height, necessary for leaflet
    nav_map_div.style.height = (nav_map_div.getBoundingClientRect().bottom - nav_map_div.getBoundingClientRect().top) + "px";

    //after everything else
    nextLevel();
}

function randLat() {
    // -90.000 to 90.000
    return parseFloat(((Math.floor(Math.random() * 180000) / 1000) - 90).toFixed(3));
}

function randLong() {
    // -180.000 to 180.000
    return parseFloat(((Math.floor(Math.random() * 360000) / 1000) - 180).toFixed(3));
}

function updateFindText(lat, long) {
    var find_text = document.getElementById("find_text");
    var latstring = lat;
    var longstring = long;
    if (lat > 0.000) { latstring = lat + " N"; }
    else if (lat < 0.000) { latstring = ((-1) * lat) + " S"; }
    if (long > 0.000) { longstring = long + " E"; }
    else if (long < 0.000) { longstring = ((-1) * long) + " W"; }
    find_text.innerHTML = "Find:<br>Latitude: " + latstring + "<br>Longitude: " + longstring;
}

function embedStaticMap(lat, long) {
    var static_map = document.getElementById("static_map");
    var url = "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d136854.86183536527!2d";
    url = url + long;
    url = url + "!3d";
    url = url + lat;
    url = url + "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sel!2sgr!4v1664465292313!5m2!1sel!2sgr"; //GOOGLE
    static_map.src = url;
    console.log(url);
}

var lat;
var long;
function nextLevel() {
    lat = randLat();
    long = randLong();
    updateFindText(lat, long);
    embedStaticMap(lat, long);
    if (isMapLoaded == false) {
        loadMap();
    } else {
        map.eachLayer(function (layer) {
            if (layer._url == undefined) {   //markers have this undefined
                map.removeLayer(layer);
            }
        });
        guessMarker = null;
        trueMarker = null;
        map.flyTo([0.0, 0.0], 1)
        guessLat = null;
        guessLong = null;
    }
}

var map;
var isMapLoaded = false;
var oldguessMarker;
var guessMarker;
var oldtrueMarker;
var trueMarker;
var guessLat;
var guessLong;

function onMapClick(e) {
    if (!guessMarker) {
        guessMarker = L.marker(e.latlng).addTo(map);
    } else {
        guessMarker.setLatLng(e.latlng);
    }
    oldguessMarker = guessMarker;
    guessLat = e.latlng.lat;
    guessLong = e.latlng.lng;
}

function loadMap() {
    var southEast = L.latLng(-90.000, 180.000);
    var northWest = L.latLng(90.000, -180.000);
    var bounds = L.latLngBounds(southEast, northWest);
    map = L.map('nav_map_div', { maxBounds: bounds }).setView([0.0, 0.0], 1);
    L.tileLayer('https://a.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Kartendaten: © OpenStreetMap-Mitwirkende, SRTM | Kartendarstellung: © OpenTopoMap (CC-BY-SA)'
    }).addTo(map);
    map.on('click', onMapClick);
    isMapLoaded = true;
    loadPrimeMeridianAndEquator();
}

function loadPrimeMeridianAndEquator() {
    var pmPolyline = L.polyline([[90.000, 0.000], [-90.000, 0.000]], { color: 'grey', weight: '0.2' }).addTo(map);
    var eqPolyline = L.polyline([[0.000, -180.000], [0.000, 180.000]], { color: 'grey', weight: '0.2' }).addTo(map);
}

function guess() {
    if (guessLat == undefined || guessLat == null || guessLong == undefined || guessLong == null) {
        //alert("Please place a marker on the map first!");
        openInvalidModal();
        return;
    } else {
        dist = parseFloat(((L.latLng(guessLat, guessLong).distanceTo(L.latLng(lat, long))) / 1000).toFixed(3)); //for kilometers
        /*alert("Your guess was:\nLatitude: " + guessLat + "\nLongitude: " + guessLong + "\nWhich is " + dist + "km away from the target.");*/
        var guessText = document.getElementById("validGuessText");
        guessText.innerHTML = "Latitude: " + parseFloat(guessLat.toFixed(3)) + "<br>Longitude: " + parseFloat(guessLong.toFixed(3)) + "<br>Distance (km/miles) from target coordinates: " + dist;
        guessText.innerHTML = guessText.innerHTML + " / " + parseFloat((dist * 0.62137).toFixed(3));
        trueMarker = L.marker(L.latLng(lat, long), { opacity: 0.7 }).addTo(map);
        oldtrueMarker = trueMarker;
        map.flyTo([lat, long], 4);
        openValidModal();
        return;
    }
}

function onLogoClick() {
    window.location.href = "https://thepadguy.github.io/LocationGuessr/";
}

function openInvalidModal() {
    document.getElementById("invalidGuessModal").style.display = "block";
}
function closeInvalidModal() {
    document.getElementById("invalidGuessModal").style.display = "none";
}

function openValidModal() {
    document.getElementById("validGuessModal").style.display = "block";
}
function closeValidModal() {
    document.getElementById("validGuessModal").style.display = "none";
}

//window onclick events here
window.onclick = function (event) {
    if (event.target == document.getElementById("invalidGuessModal")) {
        document.getElementById("invalidGuessModal").style.display = "none";
    } else if (event.target == document.getElementById("validGuessModal")) {
        document.getElementById("validGuessModal").style.display = "none";
    }


}

//reload page on orientation change
window.onorientationchange = function () {
    window.location.reload();
}