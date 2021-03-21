const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db.js')

const { PORT } = require('./config');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});

// for validation
const notEmpty = str => str.match(/^\s*$/gi) === null;

// ROUTES

// EVENT ROUTES

// view all events
app.get('/events', async (req, res) => {
    try {
        const allEvents = await db.query('SELECT * FROM events');
        res.json(allEvents.rows);
    } catch (error) {
        console.log(error.message);
    }
})

// add an event
app.post('/events', async (req, res) => {
    try {
        // for now just these three
        const { title, date, category } = req.body;

        if (notEmpty(title) && notEmpty(date) && notEmpty(category)) {
            const event = await db.query(
                'INSERT INTO events (title, date, category)'
                + ' VALUES ($1, $2, $3) RETURNING *',
                [title, date, category]
            );
            res.json(event.rows[0]);
        }

        res.status(404).send('Invalid event input');
    } catch (error) {
        console.log(error.message);
    }
})

// get an event
app.get('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const event = await db.query(
            'SELECT * FROM events WHERE event_id = $1', [id]);
        
        res.json(event.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})

// edit an event
app.put('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, category } = req.body;

        const updatedEvent = await db.query(
            'UPDATE events' +
            ' SET title = $2, date = $3, category = $4'
            +' WHERE event_id = $1',
            [id, title, date, category]
        );

        res.json(updatedEvent.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
})
// delete an event
app.delete('/events/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedEvent = await db.query(
            'DELETE FROM events WHERE event_id = $1',
            [id]
        );

        res.json('Event deleted');
    } catch (error) {
        console.log(error.message);
    }
})

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


// Get favorites 
app.get('/users/:id/favorites', async (req, res) => {
    try {
        const { id } = req.params;

        const getFaves = await db.query(
            'SELECT e.title FROM favorites AS f'
            + ' INNER JOIN events AS e'
            + ' ON e.event_id = f.event_id'
            + ' WHERE f.uid = $1', [id]
        );
        
        const eventsArr = getFaves.rows.reduce((acc, e) => acc.concat(e.title), []);

        res.json(eventsArr);

    } catch (error) {
        console.log(error.message);
    }
})

