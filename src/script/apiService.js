import { apiKey, speakersUrl, usersUrl, eventsUrl } from "./apiConfig.js";

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

// Fetch users from the API
export async function fetchUsers() {
  try {
    const response = await fetch(usersUrl, {
      method: "GET",
      headers: {
        "x-apikey": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching users");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

// Register a new user via the API
export async function registerUser(userData) {
  try {
    const response = await fetch(usersUrl, {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
