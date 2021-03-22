
// Parent of entire event component, 
// including searching, adding, deleting, etc

import React from 'react';
import EventsList from './Events/EventsList';
import EventsSearch from './EventsSearch';
import EventViewBtn from './EventViewBtn';

export default function EventsMain() {
    
    return (
        <>
            <h2>Events</h2>
            <div class="viewbox">
                <EventsList />
                <EventsSearch /> 
            </div>

        </>
    );
}
