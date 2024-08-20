const isLocal = window.location.hostname === "localhost";

const baseURL = isLocal ? "" : "/.netlify/functions/proxy";
const apiKey = isLocal ? "your-local-api-key" : ""; // Use the API key directly only in local development

export async function fetchSpeakers() {
  const url = isLocal ? speakersUrl : `${baseURL}?endpoint=speakers`;

  const response = await fetch(url, {
    method: "GET",
    headers: isLocal
      ? {
          "x-apikey": apiKey,
          "Content-Type": "application/json",
        }
      : {}, // No headers needed when using the proxy
  });

  return response.json();
}

export async function fetchEvents() {
  const url = isLocal ? eventsUrl : `${baseURL}?endpoint=events`;

  const response = await fetch(url, {
    method: "GET",
    headers: isLocal
      ? {
          "x-apikey": apiKey,
          "Content-Type": "application/json",
        }
      : {}, // No headers needed when using the proxy
  });

  return response.json();
}
