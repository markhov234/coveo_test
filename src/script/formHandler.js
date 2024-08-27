import { fetchUsers, registerUser } from "./apiService.js";
import checkedMark from "../images/checked_1.png";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const firstNameInput = form.querySelector("#first-name");
  const lastNameInput = form.querySelector("#last-name");
  const emailInput = form.querySelector("#email");
  const submitButton = form.querySelector(".main-content__form-button");

  // Initially disable the submit button
  submitButton.disabled = true;

  // Event listeners to validate inputs on blur
  firstNameInput.addEventListener("blur", () => handleBlur());
  lastNameInput.addEventListener("blur", () => handleBlur());
  emailInput.addEventListener("blur", () => handleBlur());

  function handleBlur() {
    validateField(firstNameInput, /^[A-Za-z ]+$/);
    validateField(lastNameInput, /^[A-Za-z ]+$/);
    validateField(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    checkAllFieldsValid();
  }

  // Validate form fields and enable/disable the submit button
  function validateField(input, pattern) {
    if (pattern.test(input.value)) {
      input.style.borderColor = ""; // Reset to original color
      return true;
    } else {
      input.style.borderColor = "red"; // Indicate error
      return false;
    }
  }

  function checkAllFieldsValid() {
    const isFirstNameValid = validateField(firstNameInput, /^[A-Za-z ]+$/);
    const isLastNameValid = validateField(lastNameInput, /^[A-Za-z ]+$/);
    const isEmailValid = validateField(
      emailInput,
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    );

    // Enable the submit button only if all fields are valid
    submitButton.disabled = !(
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid
    );
    if (submitButton.disabled) {
      submitButton.classList.remove("valide");
    } else {
      submitButton.classList.add("valide");
    }
  }

  // Attach the submit listener to the form if everything is true
  form.addEventListener("submit", handleFormSubmit);
});

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const userData = Object.fromEntries(formData.entries());

  // Form message is the message that will be displayed to the user if the form is not submitted correctly
  const formMessage = document.getElementById("form-message");
  formMessage.textContent = "";

  const firstNameInput = form.querySelector("#first-name");
  const lastNameInput = form.querySelector("#last-name");
  const emailInput = form.querySelector("#email");

  // Reset all borders before validation
  resetInputBorders([firstNameInput, lastNameInput, emailInput]);
  formMessage.classList.remove("form-message");

  // Validate form inputs
  if (!validateForm(userData, { firstNameInput, lastNameInput, emailInput })) {
    formMessage.textContent =
      "Please ensure all fields are correctly filled out.";
    formMessage.classList.add("form-message");
    return;
  }

  try {
    const users = await fetchUsers();

    // Call checkUsersExists to check if the user already exists and what is already existing (message error)
    const validationResult = checkUserExists(
      {
        // Look for the user in the array of users
        emailExists: users.some((user) => user.email === userData.email),
        nameExists: users.some(
          (user) => user.first_name === userData.first_name
        ),
        lastNameExists: users.some(
          (user) => user.last_name === userData.last_name
        ),
      },
      // Send the inputs to the function to set the borders, those inputs are the inputs of the form
      { firstNameInput, lastNameInput, emailInput }
    );

    if (validationResult.error) {
      formMessage.textContent = validationResult.message;
      formMessage.classList.add("form-message");
      return;
    }

    const registrationResponse = await registerUser(userData);

    if (registrationResponse.ok) {
      // Use the already referenced form element
      form.innerHTML = `
        <img class="form-completed_img" src="${checkedMark}" alt="Checkmark">
        <p class="form-completed_text">Thanks for your registration.</p>
      `;
    } else {
      formMessage.textContent = "Registration failed. Please try again.";
      formMessage.classList.add("form-message");
    }
  } catch (error) {
    console.error("Error during form submission:", error);

    // Reset the form message element
    formMessage.textContent = "An error occurred. Please try again later.";
    if (!formMessage.classList.contains("form-message")) {
      formMessage.classList.add("form-message");
    }
  }
}

// Function to reset input borders
function resetInputBorders(inputs) {
  inputs.forEach((input) => {
    input.style.borderColor = "";
  });
}

// Function to validate form data
function validateForm(data, inputs) {
  // Generic patterns for name and email found on google
  const namePattern = /^[A-Za-z ]+$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let isValid = true;

  if (!namePattern.test(data.first_name)) {
    inputs.firstNameInput.style.borderColor = "red";
    isValid = false;
  }

  if (!namePattern.test(data.last_name)) {
    inputs.lastNameInput.style.borderColor = "red";
    isValid = false;
  }

  if (!emailPattern.test(data.email)) {
    inputs.emailInput.style.borderColor = "red";
    isValid = false;
  }

  return isValid;
}

// Function to check if a user already exists and set borders accordingly
// Should be in another file for better reading and organization
// Receives an object with booleans for each field and the inputs
function checkUserExists(exists, inputs) {
  let message = "";
  let error = false;

  if (exists.emailExists && exists.nameExists && exists.lastNameExists) {
    message = "A user with this email, name, and last name already exists.";
    error = true;
    inputs.firstNameInput.style.borderColor = "red";
    inputs.lastNameInput.style.borderColor = "red";
    inputs.emailInput.style.borderColor = "red";
  } else if (exists.emailExists && exists.nameExists) {
    message = "A user with this email and name already exists.";
    error = true;
    inputs.emailInput.style.borderColor = "red";
    inputs.firstNameInput.style.borderColor = "red";
  } else if (exists.lastNameExists && exists.nameExists) {
    message = "A user with this name and last name already exists.";
    error = true;
    inputs.lastNameInput.style.borderColor = "red";
    inputs.firstNameInput.style.borderColor = "red";
  } else if (exists.lastNameExists && exists.emailExists) {
    message = "A user with this email and last name already exists.";
    error = true;
    inputs.emailInput.style.borderColor = "red";
    inputs.lastNameInput.style.borderColor = "red";
  } else if (exists.emailExists) {
    message = "Email is already registered.";
    error = true;
    inputs.emailInput.style.borderColor = "red";
  } else if (exists.lastNameExists) {
    message = "Last name is already registered.";
    error = true;
    inputs.lastNameInput.style.borderColor = "red";
  } else if (exists.nameExists) {
    message = "Name is already registered.";
    error = true;
    inputs.firstNameInput.style.borderColor = "red";
  }

  return { error, message };
}

export { handleFormSubmit };
