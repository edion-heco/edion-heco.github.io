//Navigation Script
var navToggle = document.getElementById("nav-control"); 
var nav = document.getElementById("nav");

navToggle.addEventListener("click", function() {
    var isOpen = nav.classList.contains("nav-open"); 
    nav.setAttribute('class', isOpen ? "nav-hidden" : "nav-open");
});


//OEM List JSON Parsing
var componentButtons = document.getElementsByClassName("componentBtn"); 
var svgShapes = document.getElementsByTagName("path");  
const oemBtns = document.getElementsByClassName("oem-button");
const oemList = document.getElementById("oem-list");
const oemListTitle = document.getElementById("oem-list-title");
const oemListItems = document.getElementById("oem-list-items");

async function getData() { // gets component data from json file
    let response = await fetch('https://edion-heco.github.io/components.json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
    })

    let data = await response.json(); 
    
    return data; // returns json object
}

async function getOems() { // function to set list of OEM names, returns OEM title
    let data = await getData(); 
    const oems = Object.keys(data); 
    return oems; 
}

async function getComponents(oem) { // function to set list of OEM names, returns OEM component array
    let data = await getData(); 
    const components = data[oem]; 
    return components; 
}

async function toggleOem(oem) { // uses awaited data from json call to toggle visible OEM svgs
    for (let i = 0; i < svgShapes.length; i++) {
        if (svgShapes[i].classList.contains(oem)) {
            svgShapes[i].classList.remove("oem-hidden"); 
        } else {
            svgShapes[i].classList.add("oem-hidden"); 
        }
    }
}

async function populateList(oems, data) {
    for (let i = 0; i < oemBtns.length; i++) {
        oemBtns[i].addEventListener("click", function() {
            oemList.classList.remove("hidden"); 
            oemListItems.innerHTML= ""; 

            toggleOem(oems[i]);
            oemListTitle.innerHTML = data[oems[i]]["name"];

            for (let j = 0; j < data[oems[i]]["components"].length; j++) {
                let newListItem = document.createElement('div');
                newListItem.classList.add("oem-list-item");
                
                let newCircle = document.createElement('div'); 
                newCircle.classList.add("circle"); 
                newCircle.classList.add(data[oems[i]]["components"][j].componenttype)

                let newParagraph = document.createElement('p'); 
                newParagraph.innerHTML += data[oems[i]]["components"][j].brandedname;

                newListItem.append(newCircle); 
                newListItem.append(newParagraph); 

                oemListItems.append(newListItem); 
            }
        });
    }
}

async function main() {
    let oems = await getOems();
    let data = await getData();
    populateList(oems, data); 
}

main(); 

// Modals script
var modalContainers = document.getElementsByClassName("ds2c-modal-container");
var modals = document.getElementsByClassName("ds2c-modal"); 

var linkButtons = document.getElementsByClassName("linkBtn"); 

var modalContainer = modalContainers[0]; 

for (let i = 0; i < linkButtons.length; i++) {
    modalContainer.initModal(document.getElementById(linkButtons[i].getAttribute("data-linked-modal")), linkButtons[i]);
}

for (let i = 0; i < componentButtons.length; i++) {
    modalContainer.initModal(document.getElementById(componentButtons[i].getAttribute("data-linked-modal")), componentButtons[i]);
}

for (let i = 0; i < svgShapes.length; i++) {
    modalContainer.initModal(document.getElementById(svgShapes[i].getAttribute("data-linked-modal")), svgShapes[i]);
}