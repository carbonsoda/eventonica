const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db.js');

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
    db.query('SELECT * FROM events')
        .then(allEvents => res.json(allEvents.rows))
        .catch(e => console.error(e.stack));
}
)

// add an event
app.post('/events', async (req, res) => {
    const { title, date, category } = req.body;
    console.log(title, date, category);

    if (notEmpty(title) && notEmpty(date) && notEmpty(category)) {

        db.query(
            'INSERT INTO events (title, date, category)'
            + ' VALUES ($1, $2, $3) RETURNING *',
            [title, date, category]
        )
            .then(event => res.json(event.rows[0]))
            .catch(e => console.error(e.stack));
    } else {
        res.status(404).send('Invalid event input');
    }

})

// get an event
app.get('/events/:id', async (req, res) => {
    const { id } = req.params;

    db.query(
        'SELECT * FROM events WHERE event_id = $1',
        [id]
    )
        .then(event => res.json(event.rows[0]))
        .catch(e => console.error(e.stack));
})

// edit an event
app.put('/events/:id', async (req, res) => {
    const { id } = req.params;
    const { title, date, category } = req.body;

    db.query(
        'UPDATE events' +
        ' SET title = $2, date = $3, category = $4'
        + ' WHERE event_id = $1',
        [id, title, date, category]
    )
        .then(updatedEvent => res.json(updatedEvent.rows[0]))
        .catch(e => console.error(e.stack));
})

// delete an event
app.delete('/events/:id', async (req, res) => {
    const { id } = req.params;

    db.query(
        'DELETE FROM events WHERE event_id = $1',
        [id]
    ).catch(e => console.error(e.stack));

    db.query(
        'DELETE FROM favorites WHERE event_id = $1',
        [id]
    ).catch(e => console.error(e.stack));

    res.status(204);
})

// USER ROUTES

// view all users 
app.get('/users', async (req, res) => {
    db.query('SELECT * FROM users')
        .then(allUsers => res.json(allUsers.rows))
        .catch(e => console.error(e.stack));
})

// add a user
app.post('/users', async (req, res) => {
    const { name, email } = req.body;

    if (notEmpty(name)) {

        db.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        )
            .then(user => res.status(201).json(user.rows[0]))
            .catch(e => console.error(e.stack));
    }
    res.status(404).send('Check input');
})

// get a user
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;

    db.query(
        'SELECT * FROM users WHERE uid = $1',
        [id]
    )
        .then(user => res.json(user.rows[0]))
        .catch(e => console.error(e.stack));
})

// edit a user
// just name for now, can add in email update later
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (notEmpty(name)) {

        db.query(
            'UPDATE users SET name = $1 WHERE uid = $2',
            [name, id]
        )
            .then(res.send(201))
            .catch(e => console.error(e.stack));
    }

    res.status(404).send('Invalid input, name cannot be blank');
})

// delete a user
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    db.query(
        'DELETE FROM users WHERE uid = $1',
        [id]
    ).catch(e => console.error(e.stack));

    db.query(
        'DELETE FROM favorites WHERE uid = $1',
        [id]
    ).catch(e => console.error(e.stack));

    res.status(204);
})


// FAVORITES

// user specific
app.get('/users/:id/favorites', async (req, res) => {
    const { id } = req.params;

    db.query(
        'SELECT e.title FROM favorites AS f'
        + ' INNER JOIN events AS e'
        + ' ON e.event_id = f.event_id'
        + ' WHERE f.uid = $1',
        [id]
    )
        .then(result => result.rows)
        .then(eventRows => eventRows.reduce((acc, e) => acc.concat(e.title), []))
        .then(faveEvents => res.json(faveEvents))
        .catch(e => console.error(e.stack));
})

// Who favorite'd an event 

app.get('/events/:id/favorite', (req, res) => {
    const { id } = req.params;

    db.query(
        'SELECT u.name FROM favorites AS f'
        + ' INNER JOIN users AS u ON u.uid = f.uid'
        + ' WHERE f.event_id = $1',
        [id]
    )
        .then(result => result.rows)
        .then(nameRows => nameRows.reduce((acc, u) => acc.concat(u.name), []))
        .then(faveNames => res.json(faveNames))
        .catch(e => console.error(e.stack));
})


// SEARCH

// By date
app.get('/search/date', (req, res) => {
    const { start, end } = req.body;

    let whereQuery = [];

    if (notEmpty(start)) {
        console.log(start);
        whereQuery.push(`date >= \'${start}\'`);
    }
    if (notEmpty(end)) {
        whereQuery.push(`date <= \'${end}\'`);
    }

    // allows proper escaping for '' in dates 
    const fullQuery = "SELECT * FROM events WHERE " + whereQuery.join(' AND ');

    db.query(fullQuery)
        .then(getEvents => res.json(getEvents.rows))
        .catch(e => console.error(e.stack));

})

// By category
app.get('/search/category', async (req, res) => {

    const { category } = req.body;

    db.query(
        'SELECT * FROM events WHERE category = $1',
        [category]
    )
        .then(getEvents => res.json(getEvents.rows))
        .catch(e => console.error(e.stack));
})

