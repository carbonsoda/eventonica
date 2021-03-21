// Shows all event items

import React from 'react';
import Event from './Event';
import EditEvent from './EditEvent';

export default function EventsList() {
    const [events, setEvents] = React.useState([]);

    const deleteEvent = async () => {
        try {
            // const delete = await fetch('')
        } catch (error) {
            console.error(error);
        }
    }

    const getEvents = async () => {
        try {
            const res = await fetch('http://localhost:5000/events');
            const allEvents = await res.json();

            setEvents(allEvents);
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        getEvents();
    }, []);

    return (
        <>
            <h2>All events</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { events.map(event => (
                        <tr key={ event.event_id }>
                            <Event event={ event } />
                            <td>
                                <EditEvent event={ event } />
                            </td>
                            <td>
                                <button className="btn">
                                    Delete
                                    </button>
                            </td>
                        </tr>
                    ))
                        
                    }
                </tbody>
                
            </table>
        </>
    )
}

