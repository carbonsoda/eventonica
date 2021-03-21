// individual events
import React from 'react';

export default function Event({event}) {

  let { title, date, category } = event;
  date = new Date(date).toLocaleDateString(undefined,
    { weekday: 'short', month: 'short', day: 'numeric'}
  );

  return (
    <>
      <td>{ date }</td>
      <td>{ title }</td>
      <td>{ category }</td>
    </>
  );
}
