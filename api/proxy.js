import axios from 'axios';

export default async function handler(req, res) {
  try {
    // Forward the request to your VPS
    const response = await axios({
      method: req.method,
      url: `http://206.189.46.189${req.url}`,
      headers: {
        // Forward the incoming request headers except for 'host'
        ...req.headers,
        host: '206.189.46.189', // Set the host header to your VPS
      },
      data: req.body, // Forward the request body
      timeout: 99000, // 99 seconds timeout
    });

    // Send the VPS response back to the client
    res.status(response.status).set(response.headers).send(response.data);
  } catch (error) {
    console.error('Error proxying request:', error.message);
    res.status(500).send('Error with the VPS response');
  }
}
