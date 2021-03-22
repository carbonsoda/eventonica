// Row with fields to add events
// has form fields + a button 
// this submits to db too

import React from 'react'


export default function EventAdd({addEvent}) {

    const [title, setTitle] = React.useState('');
    const [date, setDate] = React.useState('');
    const [category, setCategory] = React.useState('');

    const defaultCategories = ['Workshop', 'Seminar', 'Concert', 'Lecture'];

    const onSubmitForm = async e => {
        e.preventDefault();

        const body = { title, date, category };
        addEvent(body);

        setTitle('');
        setDate('');
        setCategory('');
    }

    return (
        <>
            <form onSubmit={ onSubmitForm }>
                    <input
                        type="date"
                        onChange={ e => setDate(e.target.value) }
                    />
                    <input
                        type="text"
                    placeholder="Virtual corgi hugs"
                        onChange={ e => setTitle(e.target.value) }
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
                        Add
                    </button>

            </form>
        </>
    )
}
