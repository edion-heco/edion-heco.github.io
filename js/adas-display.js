//Navigation Script
var navToggle = document.getElementById("nav-control"); 
var nav = document.getElementById("nav");

navToggle.addEventListener("click", function() {
    var isOpen = nav.classList.contains("nav-open"); 
    nav.setAttribute('class', isOpen ? "nav-hidden" : "nav-open");
});

//OEM List JSON Parsing
// var oemList = document.getElementById("oem-list"); 
// import data from '../components.json' assert { type: 'json' }; 
// console.log(data); 

//SVG Script
var componentButtons = document.getElementsByClassName("componentBtn"); 
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

const oems = ["bmw", "chrysler", "ford", "gm", "honda", "hyundai", "jaguar", "mazda", "mercedes", "mitsubishi", "nissan", "subaru", "toyota", "vw", ];
const oemBtns = document.getElementsByClassName("oem-button");

const data = "./components.json"; 
const oemList = document.getElementById("oem-list"); 

import data from '../components.js' assert { type: 'json' }; 

const json = JSON.parse(data); 

console.log(json); 

function toggleOem(oem) { 
    // for (let i = 0; i < svgShapes.length; i++) {
    //     if (svgShapes[i].classList.contains(oem)) {
    //         svgShapes[i].classList.remove("oem-hidden"); 
    //         var output = "";
    //         for (var i )
    //         oemList.innerHTML = `
    //         <h3 class="ds2u-font-heading-h3 white-text">Honda / Acura Systems</h3>
    //         <div class="oem-list-item"><div class="radar circle"></div><p>Collision Mitigation Braking System</p></div>
    //         `;
    //     } else {
    //         svgShapes[i].classList.add("oem-hidden"); 
    //     }
    // }
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

for (let i = 0; i < componentButtons.length; i++) {
    modalContainer.initModal(document.getElementById(componentButtons[i].getAttribute("data-linked-modal")), componentButtons[i]);
}

for (let i = 0; i < svgShapes.length; i++) {
    modalContainer.initModal(document.getElementById(svgShapes[i].getAttribute("data-linked-modal")), svgShapes[i]);
}








