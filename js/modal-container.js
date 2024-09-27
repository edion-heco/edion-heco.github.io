//Remove or add modal container(s). After this section, there should be one and only one element with the class 'ds2c-modal-container'

var modalContainers = document.getElementsByClassName("ds2c-modal-container");
if (modalContainers.length > 1) {
	console.warn("DS2 Warning: multiple modal containers exist on this page. There should only be one element with classname 'ds2c-modal-container'. Removing subsequent containers...");
	for (let i = modalContainers.length-1; i > 0 ; i--) {
		modalContainers[i].remove();
	}
}
if (modalContainers.length < 1) {
	let newModalContainer = document.createElement("div");
	newModalContainer.classList.add("ds2c-modal-container");
	document.getElementsByTagName('body')[0].appendChild(newModalContainer);
}
var mainModalContainer = modalContainers[0];

//'instance variables'
mainModalContainer.modalIdentifier = 0;

mainModalContainer.initModal = function (modalElement, openButton = null) {
	let curModal = modalElement;
	let modalIdAttribute = "modalid-" + mainModalContainer.modalIdentifier;
	curModal.setAttribute("data-modal-identifier", modalIdAttribute);
	curModal.remove();
	mainModalContainer.appendChild(curModal);
	if (openButton != null) {
		openButton.setAttribute("data-target-modal", modalIdAttribute);
		openButton.onclick = () => { mainModalContainer.showModal(modalIdAttribute)};
	}
	let closeButtons = curModal.getElementsByClassName("ds2u-popup-close-button");
	for (var i = 0; i < closeButtons.length; i++) {
		closeButtons[i].addEventListener("click", function () { mainModalContainer.hideModal(); });
	}
	mainModalContainer.modalIdentifier++;
	let returnObj = {
		'modalElement': curModal,
		'modalIdAttribute':modalIdAttribute
	}
	return returnObj;
}

mainModalContainer.showModal = function (modalIdAttribute) {
	let modals = document.getElementsByClassName("ds2c-modal");
	for (let i = 0; i < modals.length; i++) {
		let curModal = modals[i];
		if (curModal.getAttribute("data-modal-identifier") == modalIdAttribute) {
			curModal.classList.add("ds2m-active");
		} else {
			curModal.classList.remove("ds2m-active");
		}
	}

}

mainModalContainer.hideModal = function () {
	let modals = document.getElementsByClassName("ds2c-modal");
	for (let i = 0; i < modals.length; i++) {
		let curModal = modals[i];
		curModal.classList.remove("ds2m-active");
		mainModalContainer.stopVideo(curModal);
	}
}

mainModalContainer.stopVideo = function (curModal) {
	let iframe = curModal.getElementsByTagName("iframe")[0];
	if (typeof iframe !== 'undefined' && iframe !== null) {
		if (!iframe.src.includes("&enablejsapi=1")) {
			iframe.src = iframe.src + "&enablejsapi=1";
		}

		let CW = iframe.contentWindow;
		CW.postMessage(
			'{"event":"command","func":"stopVideo","args":""}',
			"*"
		);
	}
}

mainModalContainer.addEventListener("click", (e) => {
	if (e.target === mainModalContainer)
		mainModalContainer.hideModal();
});