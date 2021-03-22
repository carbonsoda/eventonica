// Search for events

import React from 'react'
import Event from './Events/Event'

export default function EventsSearch() {
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [results, setResults] = React.useState([]);

    const defaultCategories = ['Workshop', 'Seminar', 'Concert', 'Lecture'];

    const onSubmitForm = async e => {
        e.preventDefault();

        const body = { 'start': startDate, 'end': endDate, 'category': category };

        fetch('http://localhost:5000/search',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }
        )
            .then(res => res.json())
            .then(allEvents => setResults(allEvents))
            .catch(e => console.error(e.stack));
    }


    return (
        <>
            <h2>Search Events</h2>
            <form onSubmit={ onSubmitForm }>
                <input
                    type="date"
                    value={ startDate }
                    onChange={ e => setStartDate(e.target.value) }
                />
                <input
                    type="date"
                    value = {endDate}
                    onChange={ e => setEndDate(e.target.value) }
                />

                <select
                    value={ category }
                    onChange={ e => setCategory(e.target.value) }
                >
                    <option value="">---Category----</option>
                    { defaultCategories.map(category => (
                        <option value={ category } key={ category }>
                            {category }
                        </option>
                    )) }
                </select>
                <button type="submit">
                    Search
                </button>
            </form>

            {
                results.length < 1 ? <></>
                    : <table class="table table-hover mx-auto">
                        <thead>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Category</th>
                        </thead>
                        <tbody>
                            {
                                results.map(event => (
                                    <tr key={ event.event_id }>
                                        <Event event={ event } />
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>
             }

        </>
    )
}
