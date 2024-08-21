const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const apiKey = process.env.APP_API_KEY;
  const eventsUrl = process.env.APP_EVENTS_URL;

  try {
    const response = await fetch(eventsUrl, {
      method: "GET",
      headers: {
        "x-apikey": apiKey,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching events" }),
    };
  }
};
