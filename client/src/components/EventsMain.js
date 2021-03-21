
// Parent of entire event component, 
// including searching, adding, deleting, etc

import React from 'react';
import EventsList from './EventsList';
import EventsSearch from './EventsSearch';
import EventViewBtn from './EventViewBtn';
import EventAdd from './EventAdd';

export default function EventsMain() {
    
    return (
        <>
            <h2>Events</h2>
            <div class="changeView">
                <EventViewBtn name='All Events' />
                <EventViewBtn name='Search Events' />
            </div>
            <div class="viewbox">
                <EventsList />
                <EventsSearch />
            </div>
            <div>
                <EventAdd />
            </div>

        </>
    );
}
