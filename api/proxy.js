import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Forward the request to your VPS
    const response = await axios({
      method: req.method,
      url: `http://206.189.46.189${req.url}`,
      timeout: 60000 // 60 seconds timeout
    });

    // Send the VPS response back to the client
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error('Error proxying request:', error.message);
    res.status(500).send('Error with the VPS response');
  }
}
