//Navigation Script
var navToggle = document.getElementById("nav-control"); 
var nav = document.getElementById("nav");

navToggle.addEventListener("click", function() {
    var isOpen = nav.classList.contains("nav-open"); 
    nav.setAttribute('class', isOpen ? "nav-hidden" : "nav-open");
});


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

// const oems = ["bmw", "chrysler", "ford", "gm", "honda", "hyundai", "jaguar", "mazda", "mercedes", "mitsubishi", "nissan", "subaru", "toyota", "vw", ];
const oemBtns = document.getElementsByClassName("oem-button");


//OEM List JSON Parsing
const oemList = document.getElementById("oem-list");

async function getData() {
    let response = await fetch('https://edion-heco.github.io/components.json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })

    let data = await response.json(); 
    
    return data; // returns json object
}

// const result = getData().then(data => {
//     data.stringify();
// });

// console.log(result); 
async function setOems() {
    let data = await getData(); 
    const oems = []; 
    for (var i in data) {
        oems.push(Object.keys(data)); 
        console.log(Object.keys(data))
    }
    console.log(oems); 
    return oems; 
}

const oems = setOems(); 
console.log(oems); 

async function toggleOem(oem) {
    let data = await getData(); 
    
    for (let i = 0; i < svgShapes.length; i++) {
        if (svgShapes[i].classList.contains(oem)) {
            svgShapes[i].classList.remove("oem-hidden"); 
            // var output = "";
            // for (var i )
            // oemList.innerHTML = `
            // <h3 class="ds2u-font-heading-h3 white-text">Honda / Acura Systems</h3>
            // <div class="oem-list-item"><div class="radar circle"></div><p>Collision Mitigation Braking System</p></div>
            // `;
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

for (let i = 0; i < componentButtons.length; i++) {
    modalContainer.initModal(document.getElementById(componentButtons[i].getAttribute("data-linked-modal")), componentButtons[i]);
}

for (let i = 0; i < svgShapes.length; i++) {
    modalContainer.initModal(document.getElementById(svgShapes[i].getAttribute("data-linked-modal")), svgShapes[i]);
}








