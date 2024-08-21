import { apiKey, speakersUrl, eventsUrl } from "./apiConfig.js";

export async function fetchSpeakers() {
  const response = await fetch(speakersUrl, {
    method: "GET",
    headers: {
      "x-apikey": apiKey,
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
export async function fetchEvents() {
  const response = await fetch(eventsUrl, {
    method: "GET",
    headers: {
      "x-apikey": apiKey,
      "Content-Type": "application/json",
    },
  });
  return response.json();
}
