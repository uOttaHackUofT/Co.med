// pages/api/class.js
const request = require('request');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const options = {
      method: 'POST',
      url: 'https://api.cohere.ai/v1/classify',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_KEY}` // Replace with your actual API key
      },
      body: JSON.stringify(req.body) // Forward the body received from the front-end
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error('Error with Cohere classify:', error);
        return res.status(500).json({ message: 'Error processing your request' });
      }
      res.status(200).json(JSON.parse(body)); // Send the response back to the client
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}