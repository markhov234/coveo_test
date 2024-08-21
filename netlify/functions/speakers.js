exports.handler = async function (event, context) {
  const { default: fetch } = await import("node-fetch");
  const apiKey = process.env.APP_API_KEY;
  const speakersUrl = process.env.APP_SPEAKERS_URL;

  try {
    const response = await fetch(speakersUrl, {
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
      body: JSON.stringify({ error: "Error fetching speakers" }),
    };
  }
};
