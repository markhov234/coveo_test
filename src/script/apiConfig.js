// src/apiConfig.js

// Determine if the environment is local or production
const isLocal = window.location.hostname === "localhost";

console.log("isLocal", isLocal);

// URLs for API requests
const speakersUrl = isLocal
  ? process.env.APP_SPEAKERS_URL_LOCAL
  : process.env.APP_SPEAKERS_URL;

console.log("speakersUrl", speakersUrl);
const eventsUrl = isLocal
  ? process.env.APP_EVENTS_URL_LOCAL
  : process.env.APP_EVENTS_URL;

// Do not expose the API key directly in client-side code
const apiKey = process.env.APP_API_KEY;

export { speakersUrl, eventsUrl, apiKey };
