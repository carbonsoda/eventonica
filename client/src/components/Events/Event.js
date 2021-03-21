// individual events
import React from 'react';

export default function Event(event) {

  let { title, date, category } = event.event;
  date = new Date(date).toDateString();

  return (
    <div>
      { title } @ { date } - {category }
    </div>
  );
}
