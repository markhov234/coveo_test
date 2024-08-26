// Determine if the environment is local or production
const isLocal = window.location.hostname === "localhost";

// URLs for API requests
const speakersUrl = isLocal
  ? process.env.APP_SPEAKERS_URL_LOCAL
  : "/.netlify/functions/speakers";
const eventsUrl = isLocal
  ? process.env.APP_EVENTS_URL_LOCAL
  : "/.netlify/functions/events";

const usersUrl = isLocal
  ? process.env.APP_USERS_URL_LOCAL
  : "/.netlify/functions/users";
  

const apiKey = isLocal ? process.env.APP_API_KEY_LOCAL : "";

export { speakersUrl, eventsUrl, apiKey, usersUrl };
