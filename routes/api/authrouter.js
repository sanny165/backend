const express = require('express');
const authrouter = express.Router();
const path = require('path');
const { handleLogin } = require('../../controllers/authcontroller');


authrouter.post('/login', handleLogin);
// Serve the 404 page
authrouter.get('/404', (req, res) =>
    res.sendFile(path.join(__dirname, '../../views', '404.html'))
);
// Serve the index page
authrouter.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../../views', 'index.html'))
);
