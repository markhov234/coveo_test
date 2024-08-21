// main.js
import { loadSpeakers, loadMainEvent } from "./uiService.js";
import "../style/sass/style.scss";

document.addEventListener("DOMContentLoaded", async () => {
  await loadSpeakers();
  await loadMainEvent();
});
