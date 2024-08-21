// src/apiConfig.js

const isLocal = window.location.hostname === "localhost";

const speakersUrl = isLocal ? "/api/speakers" : "/.netlify/functions/speakers";
const eventsUrl = isLocal ? "/api/events" : "/.netlify/functions/events";

export { speakersUrl, eventsUrl };
