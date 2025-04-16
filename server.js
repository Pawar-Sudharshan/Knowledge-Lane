const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to parse form data (application/x-www-form-urlencoded)
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Email sending route
app.post('/send', async (req, res) => {
    const { firstname, lastname, country, subject } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',       // ✅ Replace with your Gmail
            pass: 'your_app_password'           // ✅ Use 16-character Gmail App Password
        }
    });

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: 'your_email@gmail.com',
        subject: `Feedback from ${firstname} ${lastname}`,
        text: `Name: ${firstname} ${lastname}\nCountry: ${country}\nMessage:\n${subject}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send(`<script>alert("✅ Feedback sent successfully!"); window.history.back();</script>`);
    } catch (err) {
        console.error("Email Error:", err);
        res.send(`<script>alert("❌ Failed to send email."); window.history.back();</script>`);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});

// npm init -y
// npm install express nodemailer body-parser cors
// node server.js
