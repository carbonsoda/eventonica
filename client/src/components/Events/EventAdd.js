// Row with fields to add events
// has form fields + a button 
// this submits to db too

import React from 'react'


export default function EventAdd() {

    const [title, setTitle] = React.useState('');
    const [date, setDate] = React.useState('');
    const [category, setCategory] = React.useState('');

    const defaultCategories = ['Workshop', 'Seminar', 'Concert', 'Lecture'];

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { title, date, category };
            console.log(body);

            const res = await fetch(
                'http://localhost:5000/events',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
            
            const output = await res.json();

            console.log(output);
            window.location = '/';
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <>
            <h2>Event Add</h2>
            <form onSubmit={ onSubmitForm }>
                <input
                    type="text"
                    placeholder="Virtual corgi hugs"
                    onChange={ e => setTitle(e.target.value) }
                />
                <input
                    type="date"
                    onChange={ e => setDate(e.target.value)}
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
                    ))}
                </select>

                <button type="submit" value="Add" />
            </form>
        </>
    )
}
