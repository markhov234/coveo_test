/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script/apiConfig.js":
/*!*********************************!*\
  !*** ./src/script/apiConfig.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiKey: () => (/* binding */ apiKey),
/* harmony export */   eventsUrl: () => (/* binding */ eventsUrl),
/* harmony export */   speakersUrl: () => (/* binding */ speakersUrl)
/* harmony export */ });
// src/apiConfig.js

const apiKey = "66b4d449b8678a5a97284999"; // Access the API key from the .env file
const speakersUrl = "https://isfrontendtest-d98a.restdb.io/rest/speakers"; // Access the speakers URL from the .env file
const eventsUrl = "https://isfrontendtest-d98a.restdb.io/rest/events"; // Access the events URL from the .env file



/***/ }),

/***/ "./src/script/apiService.js":
/*!**********************************!*\
  !*** ./src/script/apiService.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchEvents: () => (/* binding */ fetchEvents),
/* harmony export */   fetchSpeakers: () => (/* binding */ fetchSpeakers)
/* harmony export */ });
/* harmony import */ var _apiConfig_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiConfig.js */ "./src/script/apiConfig.js");
// src/apiService.js


const isLocal = window.location.hostname === "localhost";
const baseURL = isLocal ? "" : "/.netlify/functions/proxy";
async function fetchSpeakers() {
  const url = isLocal ? _apiConfig_js__WEBPACK_IMPORTED_MODULE_0__.speakersUrl : `${baseURL}?endpoint=speakers`;
  const response = await fetch(url, {
    method: "GET",
    headers: isLocal ? {
      "x-apikey": _apiConfig_js__WEBPACK_IMPORTED_MODULE_0__.apiKey,
      "Content-Type": "application/json"
    } : {} // No headers needed when using the proxy
  });
  return response.json();
}
async function fetchEvents() {
  const url = isLocal ? _apiConfig_js__WEBPACK_IMPORTED_MODULE_0__.eventsUrl : `${baseURL}?endpoint=events`;
  const response = await fetch(url, {
    method: "GET",
    headers: isLocal ? {
      "x-apikey": _apiConfig_js__WEBPACK_IMPORTED_MODULE_0__.apiKey,
      "Content-Type": "application/json"
    } : {} // No headers needed when using the proxy
  });
  return response.json();
}

/***/ }),

/***/ "./src/script/formatDate.js":
/*!**********************************!*\
  !*** ./src/script/formatDate.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formatDate: () => (/* binding */ formatDate)
/* harmony export */ });
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  let formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  const day = date.getDate();
  let daySuffix;
  if (day >= 11 && day <= 13) {
    daySuffix = "th";
  } else {
    switch (day % 10) {
      case 1:
        daySuffix = "st";
        break;
      case 2:
        daySuffix = "nd";
        break;
      case 3:
        daySuffix = "rd";
        break;
      default:
        daySuffix = "th";
    }
  }
  formattedDate = formattedDate.replace(/\d+/, day + daySuffix);
  return formattedDate;
}

/***/ }),

/***/ "./src/script/uiService.js":
/*!*********************************!*\
  !*** ./src/script/uiService.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadMainEvent: () => (/* binding */ loadMainEvent),
/* harmony export */   loadSpeakers: () => (/* binding */ loadSpeakers)
/* harmony export */ });
/* harmony import */ var _apiService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiService.js */ "./src/script/apiService.js");
/* harmony import */ var _formatDate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formatDate.js */ "./src/script/formatDate.js");
// uiService.js


async function loadSpeakers() {
  const speakersData = await (0,_apiService_js__WEBPACK_IMPORTED_MODULE_0__.fetchSpeakers)();
  const speakersSection = document.querySelector(".main-content__speakers-section");
  speakersSection.innerHTML = "";
  speakersData.forEach(speaker => {
    const speakerDiv = document.createElement("div");
    speakerDiv.classList.add("main-content__speaker");
    speakerDiv.innerHTML = `
      <div class="main-content__speaker-image-wrapper">
        <img class="main-content__speaker-headshot" src="${speaker.avatar}" alt="${speaker.first_name} ${speaker.last_name}">
      </div>
      <p class="main-content__speaker-name">${speaker.first_name} ${speaker.last_name}</p>
      <p class="main-content__speaker-title">${speaker.job_title} of ${speaker.company}</p>
    `;
    speakersSection.appendChild(speakerDiv);
  });
}
async function loadMainEvent() {
  const eventsData = await (0,_apiService_js__WEBPACK_IMPORTED_MODULE_0__.fetchEvents)();
  const mainTitleElement = document.querySelector(".main-content__info-title");
  const mainDateElement = document.querySelector(".main-content__info-date");
  const mainDescriptionElement = document.querySelector(".main-content__info-description");
  const mainEvent = eventsData.find(event => event.category === "r360");
  if (mainEvent) {
    mainTitleElement.textContent = mainEvent.title;
    mainDateElement.textContent = (0,_formatDate_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(mainEvent.date);
    mainDescriptionElement.textContent = mainEvent.description;
  }
}

/***/ }),

/***/ "./src/style/sass/style.scss":
/*!***********************************!*\
  !*** ./src/style/sass/style.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./src/script/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uiService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uiService.js */ "./src/script/uiService.js");
/* harmony import */ var _style_sass_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/sass/style.scss */ "./src/style/sass/style.scss");
// main.js


document.addEventListener("DOMContentLoaded", async () => {
  await (0,_uiService_js__WEBPACK_IMPORTED_MODULE_0__.loadSpeakers)();
  await (0,_uiService_js__WEBPACK_IMPORTED_MODULE_0__.loadMainEvent)();
});
/******/ })()
;
//# sourceMappingURL=index.js.map