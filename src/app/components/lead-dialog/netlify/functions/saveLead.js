const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);

    const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwXgzIfZZ9mOQxvsL2vrVVedkyWMLQtoX-OAQJhKm4ZQHWWz3dilOAzEFMxdeh0R0hA/exec'; // Replace with your Apps Script URL
    const params = new URLSearchParams(data).toString();

    // Forward request to Google Script
    const response = await fetch(`${googleScriptUrl}?${params}`);
    const result = await response.text();

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' }, // CORS header
      body: result
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ status: 'error', message: error.message })
    };
  }
};