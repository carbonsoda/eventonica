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

// for validation
const notEmpty = str => str.match(/^\s*$/gi) === null;

// ROUTES

// EVENT ROUTES

// view all events

// get an event

// edit an event

// delete an event

// USER ROUTES

// view all users 
app.get('/users', async (req, res) => {
    try {
        const allUsers = await db.query('SELECT * FROM users');
        res.json(allUsers.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// add a user
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;

        // name shouldn't ever be blank
        if (notEmpty(name)) {
            const user = await db.query(
                'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
                [name, email]
            );

            res.json(user.rows[0]);
        }

        res.status(404).send('Check input');
    } catch (error) {
        console.log(error.message);
    }
})

// get a user
app.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.query('SELECT * FROM users WHERE uid = $1', [id]);

        res.json(user.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

// edit a user
// just name for now, can add in email update later
app.put('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (notEmpty(name)) {
            const updateUser = await db.query(
            'UPDATE users SET name = $1 WHERE uid = $2',
            [name, id]
            );
            res.json(updateUser);
        }
        res.status(404).send('Invalid input, name cannot be blank');

    } catch (error) {
        console.log(error.message);
    }
})

// delete a user
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await db.query(
            'DELETE FROM users WHERE uid = $1',
            [id]
        );
        // const deleteFaves = await db.query(
        //     'DELETE FROM events WHERE uid = $1',
        //     [id]
        // );

        // console.log(deleteFaves);
        res.json(deleteUser);

    } catch (error) {
        console.log(error.message);
    }
})

