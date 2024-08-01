const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const accountSid = process.env.TWILIO_ACCOUNT_SID || 'YOUR_ACCOUNT_SID';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'YOUR_AUTH_TOKEN';
const client = twilio(accountSid, authToken);

app.post('/send-whatsapp', async (req, res) => {
  const { name, email, phone } = req.body;
  
  try {
    await client.messages.create({
      body: `New contact: Name: ${name}, Email: ${email}, Phone: ${phone}`,
      from: 'whatsapp:+14155238886',  // Your Twilio WhatsApp number
      to: 'whatsapp:+919999820213'  // Your personal WhatsApp number
    });
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));