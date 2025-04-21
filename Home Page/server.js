const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // For serving HTML/CSS if needed

// Route
app.post('/send-email', (req, res) => {
  const { firstname, lastname, country, subject } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',       // replace with your email
      pass: 'your-app-password'           // use Gmail App Password, not normal password
    }
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'thikkalboys@gmail.com',
    subject: `Feedback from ${firstname} ${lastname}`,
    text: `
      Name: ${firstname} ${lastname}
      Country: ${country}
      Message: ${subject}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Something went wrong.');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Thank you for your feedback!');
    }
  });
});

// Start Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:4000');
});
