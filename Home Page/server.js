const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (like your HTML form)
app.use(express.static('public')); // if your HTML is in a folder named 'public'

app.post('/send-email', (req, res) => {
  const { firstname, lastname, country, subject } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rahulgugulothu744@gmail.com',         // Replace with your Gmail
      pass: 'Prem@7743'             // Replace with your Gmail App Password
    }
  });

  const mailOptions = {
    from: 'your-gmail@gmail.com',
    to: 'rahulgugulothu744@gmail.com',
    subject: `New Feedback from ${firstname} ${lastname}`,
    text: `Country: ${country}\n\nMessage:\n${subject}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
