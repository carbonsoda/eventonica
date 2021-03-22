// Shows all event items

import React from 'react';
import Event from './Event';
import EditEvent from './EditEvent';
import AddEvent from './EventAdd';

export default function EventsList() {
    const [events, setEvents] = React.useState([]);

    const deleteEvent = async (id) => {
        fetch(`http://localhost:5000/events/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(setEvents(events.filter(event => event.event_id !== id)))
            .catch(e => console.error(e.stack));
    };

    const addEvent = async (inputBody) => {
        console.log(inputBody);
        fetch('http://localhost:5000/events',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inputBody)
            })
            .then(res => res.json())
            .then(() => getEvents())
            .catch(e => console.error(e.stack));
        
    }

    const getEvents = async () => {
        fetch('http://localhost:5000/events')
            .then(res => res.json())
            .then(allEvents => setEvents(allEvents))
            .catch(e => console.error(e.stack));
    }


    React.useEffect(() => {
        getEvents();
    }, []);

    return (
        <>
            <h2>All events</h2>
            <table
                class="table table-hover mx-auto"
            >
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody class="align-middle">
                    { events.map(event => (
                        <tr key={ event.event_id }>
                            <Event event={ event } />
                            <td>
                                <EditEvent event={ event } />
                            </td>
                            <td>
                                <button
                                    onClick={ () => deleteEvent(event.event_id) }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))

                    }
                </tbody>

            </table>

            <AddEvent addEvent={ addEvent }/>
        </>
    )
}

