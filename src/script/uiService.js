// uiService.js
import { fetchSpeakers, fetchEvents } from "./apiService.js";
import { formatDate } from "./formatDate.js";

export async function loadSpeakers() {
  const speakersData = await fetchSpeakers();
  const speakersSection = document.querySelector(
    ".main-content__speakers-section"
  );
  speakersSection.innerHTML = "";

  speakersData.forEach((speaker) => {
    const speakerDiv = document.createElement("div");
    speakerDiv.classList.add("main-content__speaker");

    speakerDiv.innerHTML = `
      <div class="main-content__speaker-image-wrapper">
        <img class="main-content__speaker-headshot" src="${speaker.avatar}" alt="${speaker.first_name} ${speaker.last_name}">
      </div>
      <p class="main-content__speaker-name">${speaker.first_name} ${speaker.last_name}</p>
      <p class="main-content__speaker-title">${speaker.job_title} of ${speaker.company}</p>
    `;

    speakersSection.appendChild(speakerDiv);
  });
}

export async function loadMainEvent() {
  const eventsData = await fetchEvents();
  const mainTitleElement = document.querySelector(".main-content__info-title");
  const mainDateElement = document.querySelector(".main-content__info-date");
  const mainDescriptionElement = document.querySelector(
    ".main-content__info-description"
  );

  const mainEvent = eventsData.find((event) => event.category === "r360");
  if (mainEvent) {
    mainTitleElement.textContent = mainEvent.title;
    mainDateElement.textContent = formatDate(mainEvent.date);
    mainDescriptionElement.textContent = mainEvent.description;
  }
}
