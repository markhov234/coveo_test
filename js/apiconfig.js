// apiConfig.js or directly in your script

const apiKey = process.env.APP_API_KEY; // Access the API key from the .env file
const speakersUrl = process.env.APP_SPEAKERS_URL; // Access the speakers URL from the .env file
const eventsUrl = process.env.APP_EVENTS_URL; // Access the events URL from the .env file

export { apiKey, speakersUrl, eventsUrl };
