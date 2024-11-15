const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

// Route to send OTP via email
app.post('/send-sms', async (req, res) => {
  const { email, name,number,from,to,departureDate,adults,children,travelClass, } = req.body;

  // Create a transporter for NodeMailer using your email credentials
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'amitmrj914011@gmail.com', // Your email
      pass: 'azsw pqru lywb hcxt', // Your email password (or app-specific password)
    },
  });

  let mailOptions = {
    from: 'amit@techxpert.in', // Sender email
    to: email, // Receiver's email (from frontend)
    subject: 'Your Confirmation Email',
    text: `Hello ${name} Number ${number} ${number} ${number} ${number} ${number} ${number} ${number} ${number}  `, // Email content
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Confirm your order successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error sending email');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
