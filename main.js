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
}

function onPlayClick() {
    window.location.href = window.location.href.replace("index", "playpage");
}

function openHelpModal() {
    document.getElementById("helpModal").style.display = "block";
}
function closeHelpModal() {
    document.getElementById("helpModal").style.display = "none";
}

function openInfoModal() {
    document.getElementById("infoModal").style.display = "block";
}
function closeInfoModal() {
    document.getElementById("infoModal").style.display = "none";
}

//window.onclick events here
window.onclick = function (event) {
    if (event.target == document.getElementById("helpModal")) {
        document.getElementById("helpModal").style.display = "none";
    } else if (event.target == document.getElementById("infoModal")) {
        document.getElementById("infoModal").style.display = "none";
    }
}