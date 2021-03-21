const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db.js')

const { PORT } = require('./config');

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});


// ROUTES

// EVENT ROUTES

// view all events

// get an event

// edit an event

// delete an event

// USER ROUTES

// view all users 

// get a user

// edit a user

// delete a user


