// --- Professional Node.js & Express Server for Silent City ---
// This server handles B2B partner inquiries via email and data opt-out requests.

// 1. SETUP
// To run this server, you need Node.js installed.
// Open your terminal, navigate to the directory where you saved this file, and run:
// > npm install express cors nodemailer
// Then, start the server with:
// > node server.js
// The server will be running on http://localhost:3000

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// 2. MIDDLEWARE
app.use(cors());
app.use(express.json());

// 3. NODEMAILER CONFIGURATION
// For this demo, we use a "JSON transport" which doesn't actually send emails
// but logs them to the console. This is perfect for testing without real credentials.
// For production, you would replace this with a real SMTP transport (e.g., from Gmail, SendGrid, etc.).
const transporter = nodemailer.createTransport({
    jsonTransport: true // Use JSON transport for testing
});

/*
// EXAMPLE: How to configure for a real email provider like Gmail
const transporter_prod = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Your email address
        pass: 'your-app-password'    // Your app-specific password
    }
});
*/


// 4. ROUTES

/**
 * @route   POST /partner
 * @desc    Receives a new B2B partner inquiry and sends it via email.
 * @access  Public
 */
app.post('/partner', async (req, res) => {
    const { name, locationName, email, message, userId } = req.body;
    console.log('--- Received B2B Partner Inquiry ---');
    console.log(`Data from User ID: ${userId}`);

    // Email content
    const mailOptions = {
        from: '"Silent City Website" <noreply@silentcity.app>',
        to: 'partner@silentcity.app', // The recipient address
        subject: `Neue Partneranfrage von: ${locationName}`,
        html: `
            <h1>Neue Partneranfrage</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Standort:</strong> ${locationName}</p>
            <p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Nachricht:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><em>(User-ID für Tracking: ${userId})</em></p>
        `
    };

    try {
        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('--- Email Prepared for Sending ---');
        console.log('Email JSON:', JSON.parse(info.message)); // Log the email object
        console.log('----------------------------------\n');
        res.status(200).json({ message: 'Partner inquiry sent successfully.' });
    } catch (error) {
        console.error('--- Email Sending Error ---');
        console.error(error);
        console.log('---------------------------\n');
        res.status(500).json({ message: 'Failed to send partner inquiry.' });
    }
});


/**
 * @route   POST /opt-out
 * @desc    Receives a data deletion request.
 * @access  Public
 */
app.post('/opt-out', (req, res) => {
    const { email, userId } = req.body;
    console.log('--- DATA DELETION REQUEST (OPT-OUT) ---');
    console.log(`User with email: ${email} has requested data deletion.`);
    if (userId) {
        console.log(`Associated User ID: ${userId}`);
    }
    console.log('Timestamp:', new Date().toISOString());
    console.log('ACTION REQUIRED: In a real application, you would now trigger a script to find the user by email and delete all data associated with this user from your databases and from PostHog via their API.');
    console.log('--------------------------------------\n');

    res.status(200).json({ message: 'Opt-out request received and logged.' });
});


// 5. START SERVER
app.listen(PORT, () => {
    console.log(`Silent City server running on http://localhost:${PORT}`);
});
