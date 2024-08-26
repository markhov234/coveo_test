import { fetchUsers, registerUser } from "./apiService.js";

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData.entries());

  const formMessage = document.getElementById("form-message");
  formMessage.textContent = "";

  // Validate form inputs
  if (!validateForm(userData)) {
    formMessage.textContent =
      "Please ensure all fields are correctly filled out.";
    formMessage.style.color = "red";
    return;
  }

  try {
    const users = await fetchUsers();

    // Check for unique constraints
    const emailExists = users.some((user) => user.email === userData.email);
    const nameExists = users.some(
      (user) => user.first_name === userData.first_name
    );
    const lastNameExists = users.some(
      (user) => user.last_name === userData.last_name
    );

    let message = "";
    let color = "red";

    switch (true) {
      case emailExists && nameExists && lastNameExists:
        message = "A user with this email, name, and last name already exists.";
        break;
      case emailExists && nameExists:
        message = "A user with this email and name already exists.";
        break;
      case lastNameExists && nameExists:
        message = "A user with this name and last name already exists.";
        break;
      case lastNameExists && emailExists:
        message = "A user with this email and last name already exists.";
        break;
      case emailExists:
        message = "Email is already registered.";
        break;
      case lastNameExists:
        message = "Last name is already registered.";
        break;
      case nameExists:
        message = "Name is already registered.";
        break;
      default:
        // If no conflicts, register the new user
        const registrationResponse = await registerUser(userData);

        if (registrationResponse.ok) {
          message = "Registration completed.";
          color = "green";
          form.reset();
        } else {
          message = "Registration failed. Please try again.";
        }
        break;
    }

    formMessage.textContent = message;
    formMessage.style.color = color;
  } catch (error) {
    console.error("Error during form submission:", error);
    formMessage.textContent = "An error occurred. Please try again later.";
    formMessage.style.color = "red";
  }
}

// Function to validate form data
function validateForm(data) {
  const namePattern = /^[A-Za-z ]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    namePattern.test(data.first_name) &&
    namePattern.test(data.last_name) &&
    emailPattern.test(data.email)
  );
}

// Attach event listener to the form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  form.addEventListener("submit", handleFormSubmit);
});

export { handleFormSubmit };
