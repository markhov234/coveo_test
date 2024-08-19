// main.js
import { loadSpeakers, loadMainEvent } from "./uiService.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadSpeakers();
  await loadMainEvent();
});
