// --- Simple Node.js & Express Server for Silent City ---
// This server is designed to receive and log data from the frontend.

// 1. SETUP
// To run this server, you need Node.js installed.
// Open your terminal, navigate to the directory where you saved this file, and run:
// > npm install express cors
// Then, start the server with:
// > node server.js
// The server will be running on http://localhost:3000

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 2. MIDDLEWARE
// Enable Cross-Origin Resource Sharing (CORS) so the frontend (on a different port) can communicate with the server.
app.use(cors());
// Enable the server to parse JSON formatted request bodies.
app.use(express.json());

// 3. ROUTES
// These are the endpoints that the frontend will send data to.

/**
 * @route   POST /track
 * @desc    Receives and logs user interaction data.
 * @access  Public
 */
app.post('/track', (req, res) => {
    console.log('--- User Action Received ---');
    console.log('User ID:', req.body.userId);
    console.log('Action:', req.body.action);
    console.log('Details:', req.body.details);
    console.log('Timestamp:', new Date().toISOString());
    console.log('--------------------------\n');
    res.status(200).json({ message: 'Action tracked successfully' });
});

/**
 * @route   POST /subscribe
 * @desc    Receives a new B2C email subscription.
 * @access  Public
 */
app.post('/subscribe', (req, res) => {
    const { email, userId } = req.body;
    console.log('--- New B2C Subscription ---');
    console.log('User ID:', userId);
    console.log('Email:', email);
    console.log('Timestamp:', new Date().toISOString());
    console.log('--------------------------\n');
    
    // In a real application, you would save this to a database.
    
    res.status(200).json({ message: 'Subscription successful' });
});

/**
 * @route   POST /suggest-location
 * @desc    Receives a new location suggestion.
 * @access  Public
 */
app.post('/suggest-location', (req, res) => {
    const { suggestion, userId } = req.body;
    console.log('--- New Location Suggestion ---');
    console.log('User ID:', userId);
    console.log('Suggestion:', suggestion);
    console.log('Timestamp:', new Date().toISOString());
    console.log('-----------------------------\n');

    // In a real application, you would save this to a database.

    res.status(200).json({ message: 'Suggestion received' });
});


/**
 * @route   POST /partner
 * @desc    Receives a new B2B partner inquiry.
 * @access  Public
 */
app.post('/partner', (req, res) => {
    const { name, locationName, email, message, userId } = req.body;
    console.log('--- New B2B Partner Inquiry ---');
    console.log('User ID:', userId);
    console.log('Name:', name);
    console.log('Location Name:', locationName);
    console.log('Email:', email);
    console.log('Message:', message);
    console.log('Timestamp:', new Date().toISOString());
    console.log('-----------------------------\n');
    
    // In a real application, you would save this to a database.
    
    res.status(200).json({ message: 'Partner inquiry received' });
});


// 4. START SERVER
app.listen(PORT, () => {
    console.log(`Silent City server running on http://localhost:${PORT}`);
});
