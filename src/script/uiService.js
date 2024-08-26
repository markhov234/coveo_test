// uiService.js
import { fetchSpeakers, fetchEvents } from "./apiService.js";
import { formatDate } from "./formatDate.js";

export async function loadSpeakers() {
  const speakersSection = document.querySelector(
    ".main-content__speakers-section"
  );

  // Dummy data for fallback
  const dummySpeakers = [
    {
      avatar: "https://via.placeholder.com/118",
      first_name: "John",
      last_name: "Doe",
      job_title: "Developer",
      company: "Placeholder Inc.",
    },
    {
      avatar: "https://via.placeholder.com/118",
      first_name: "Jane",
      last_name: "Smith",
      job_title: "Designer",
      company: "Placeholder Inc.",
    },
    {
      avatar: "https://via.placeholder.com/118",
      first_name: "Alice",
      last_name: "Johnson",
      job_title: "Manager",
      company: "Placeholder Inc.",
    },
    {
      avatar: "https://via.placeholder.com/118",
      first_name: "Bob",
      last_name: "Brown",
      job_title: "Analyst",
      company: "Placeholder Inc.",
    },
  ];

  try {
    const speakersData = await fetchSpeakers();
    if (!speakersData || speakersData.length === 0) {
      throw new Error("No speakers data available");
    }

    // Clear the section
    speakersSection.innerHTML = "";

    // Render speakers data
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
  } catch (error) {
    console.error("Error loading speakers:", error);
    // Fallback to dummy speakers
    speakersSection.innerHTML = "";

    dummySpeakers.forEach((speaker) => {
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
}
export async function loadMainEvent() {
  const mainTitleElement = document.querySelector(".main-content__info-title");
  const mainDateElement = document.querySelector(".main-content__info-date");
  const mainDescriptionElement = document.querySelector(
    ".main-content__info-description"
  );

  // Dummy event data for fallback
  const dummyEvent = {
    title: "Sample Event",
    date: new Date().toISOString(), // Current date in ISO format
    description: "This is a sample description for a fallback event.",
  };

  try {
    const eventsData = await fetchEvents();
    const mainEvent = eventsData.find((event) => event.category === "r360");

    if (!mainEvent) {
      throw new Error("No main event found");
    }

    // Display main event details
    mainTitleElement.textContent = mainEvent.title;
    mainDateElement.textContent = formatDate(mainEvent.date);
    mainDescriptionElement.textContent = mainEvent.description;

    const remainingEvents = eventsData.filter(
      (event) => event.category !== "r360"
    );

    remainingEvents.forEach((event) => {
      const eventElement = document.createElement("a");
      eventElement.id = event._id;
      eventElement.href = "#";
      eventElement.className = "banner-ressources-card br8 box-shadow-1";

      eventElement.innerHTML = `  
          <img class="banner-ressources-image" src="${event.thumbnail}" alt="">
            <div class="banner-ressources-content">
                <h3 class="banner-ressources-cardtitle">${event.title}</h3>
                <p class="banner-ressources-description">
                ${event.description}
                </p>
            </div>
      `;
      document
        .querySelector(".banner-ressources-scroll")
        .appendChild(eventElement);
    });
  } catch (error) {
    console.error("Error loading main event:", error);

    // Fallback to dummy event
    mainTitleElement.textContent = dummyEvent.title;
    mainDateElement.textContent = formatDate(dummyEvent.date);
    mainDescriptionElement.textContent = dummyEvent.description;
  }
}
