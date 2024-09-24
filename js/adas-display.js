var svgShapes = document.getElementsByClassName("svg-shape"); 

var toyotaBtn = document.getElementById("toyotaBtn"); 
var hondaBtn = document.getElementById("hondaBtn"); 
var nissanBtn = document.getElementById("nissanBtn"); 

function toggleOem(oem) { 
    for (let i = 0; i < svgShapes.length; i++) {
        if (svgShapes[i].classList.contains(oem)) {
            svgShapes[i].classList.remove("oem-hidden") 
        } else {
            svgShapes[i].classList.add("oem-hidden"); 
        }
    }
}
        
toyotaBtn.addEventListener("click", function() {
    toggleOem("toyota"); 
});

hondaBtn.addEventListener("click", function() {
    toggleOem("honda"); 
});

nissanBtn.addEventListener("click", function() {
    toggleOem("nissan"); 
});