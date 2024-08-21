// src/formHandler.js
import { apiKey, usersUrl } from "./apiConfig.js";

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = event.target;
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData.entries());

  try {
    // Fetch existing users to check if the email already exists
    const response = await fetch(usersUrl, {
      method: "GET",
      headers: {
        "x-apikey": apiKey,
        "Content-Type": "application/json",
      },
    });

    const users = await response.json();
    const userExists = users.some((user) => user.email === userData.email);

    if (userExists) {
      alert("User already exists.");
      return;
    }

    // If the user does not exist, register the new user
    const registrationResponse = await fetch(usersUrl, {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (registrationResponse.ok) {
      alert("Registration successful.");
      form.reset(); // Reset the form on successful registration
    } else {
      alert("Registration failed.");
    }
  } catch (error) {
    console.error("Error during form submission:", error);
    alert("An error occurred. Please try again later.");
  }
}

export { handleFormSubmit };
