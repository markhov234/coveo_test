// src/apiConfig.js

// Determine if the environment is local or production
const isLocal = window.location.hostname === "localhost";

// URLs for API requests
const speakersUrl = isLocal
  ? process.env.APP_SPEAKERS_URL_LOCAL
  : "/.netlify/functions/speakers"; // Use Netlify function for production

const eventsUrl = isLocal
  ? process.env.APP_EVENTS_URL_LOCAL
  : "/.netlify/functions/events"; // Use Netlify function for production

// API key should not be exposed directly in client-side code
const apiKey = isLocal ? process.env.APP_API_KEY_LOCAL : "";

export { speakersUrl, eventsUrl, apiKey };
