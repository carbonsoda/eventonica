// individual user

import React from 'react'

export default function User(props) {
    const [faves, setFaves] = React.useState();
    let { uid, name } = props.user;

    const getFaves = async () => {
        try {
            const res = await fetch(`http://localhost:5000/users/${uid}/favorites`);
            const allFaves = await res.json();


            setFaves(allFaves.join(', '));

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            { name }
            <button
                onClick={getFaves}
            >
                Favorites
            </button>
            { faves }
        </div>
    )
}

