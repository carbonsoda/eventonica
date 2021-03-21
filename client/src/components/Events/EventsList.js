// Shows all event items

import React from 'react';
import Event from './Event';

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
            <div>
                {
                    events.map((event) => (
                        <Event event={ event } />
                    ))
                }
            </div>
        </>
    )
}

