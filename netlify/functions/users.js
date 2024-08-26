exports.handler = async function (event, context) {
  const { default: fetch } = await import("node-fetch");
  const apiKey = process.env.APP_API_KEY;
  const usersUrl = process.env.APP_USERS_URL;

  try {
    const response = await fetch(usersUrl, {
      method: event.httpMethod, // GET or POST depending on the request
      headers: {
        "x-apikey": apiKey,
        "Content-Type": "application/json",
      },
      body: event.body || undefined, // Include the body for POST requests
    });

    const data = await response.json();
    return {
      statusCode: response.ok ? 200 : response.status,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error handling user data" }),
    };
  }
};
