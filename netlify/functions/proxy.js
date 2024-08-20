const fetch = require("node-fetch");

exports.handler = async function (event, context) {
  const apiKey = process.env.API_KEY;
  const url = `https://isfrontendtest-d98a.restdb.io/rest/${event.queryStringParameters.endpoint}`;

  const response = await fetch(url, {
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
};
