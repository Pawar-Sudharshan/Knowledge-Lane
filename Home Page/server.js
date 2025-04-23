const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

app.post('/send-email', (req, res) => {
  const { firstname, lastname, country, subject } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pawarsudar32@gmail.com', // ✅ Your new Gmail
      pass: 'nzrw etgd zbsx bfxv'       // ✅ Replace with your new Gmail App Password
    }
  });

  const mailOptions = {
    from: 'pawarsudar32@gmail.com',  // ✅ Match the authenticated Gmail
    to: 'pawarsudar32@gmail.com',    // ✅ You can also send to yourself
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
