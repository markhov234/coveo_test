// src/main.js
import { loadSpeakers, loadMainEvent } from "./uiService.js";
import { handleFormSubmit } from "./formHandler.js"; // Import form handler

import "../style/sass/style.scss";
import icon from "../images/coveoIcon.png";

document.addEventListener("DOMContentLoaded", async () => {
  await loadSpeakers();
  await loadMainEvent();

  // Attach the form handler
  const form = document.querySelector("#registration-form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
});
