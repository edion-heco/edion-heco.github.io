//SVG Script
var svgShapes = document.getElementsByClassName("svg-shape"); 

var toyotaBtn = document.getElementById("toyotaBtn"); 
var hondaBtn = document.getElementById("hondaBtn"); 
var nissanBtn = document.getElementById("nissanBtn"); 
var subaruBtn = document.getElementById("subaruBtn"); 
var hyundaiBtn = document.getElementById("hyundaiBtn"); 
var chryslerBtn = document.getElementById("chryslerBtn"); 
var mazdaBtn = document.getElementById("mazdaBtn"); 
var fordBtn = document.getElementById("fordBtn"); 
var gmBtn = document.getElementById("gmBtn"); 

const oems = ["toyota", "honda", "nissan", "subaru", "hyundai", "chrysler", "mazda", "ford", "gm"];
const oemBtns = document.getElementsByClassName("oem-button");


function toggleOem(oem) { 
    for (let i = 0; i < svgShapes.length; i++) {
        if (svgShapes[i].classList.contains(oem)) {
            svgShapes[i].classList.remove("oem-hidden") 
        } else {
            svgShapes[i].classList.add("oem-hidden"); 
        }
    }
}

for (let i = 0; i < oemBtns.length; i++) {
    oemBtns[i].addEventListener("click", function() {
        toggleOem(oems[i]); 
    });
}

// Modals script
var modalContainers = document.getElementsByClassName("ds2c-modal-container");
var modals = document.getElementsByClassName("ds2c-modal"); 

var modalContainer = modalContainers[0]; 

for (let i = 0; i < svgShapes.length; i++) {
    modalContainer.initModal(document.getElementById(svgShapes[i].getAttribute("data-linked-modal")), svgShapes[i]);
}








