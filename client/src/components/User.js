// individual user

import React from 'react'

export default function User({ user }) {
    const [faves, setFaves] = React.useState();
    const [faveBtn, setFaveBtn] = React.useState("bi bi-heart");

    let { uid, name } = user;

    const toggleFaveBtn = () => {
        if (faveBtn.endsWith('fill')) {
            setFaveBtn('bi bi-heart');
            setFaves('');
        } else {
            setFaveBtn('bi bi-heart-fill');
            getFaves();
        }
    }

    const getFaves = async () => {
        fetch(`http://localhost:5000/users/${uid}/favorites`)
            .then(res => res.json())
            .then(allFaves => setFaves(allFaves.join(', ')));
    };

    return (
        <>
            { name }
            <button
                onClick={toggleFaveBtn}
            >
                <i class={faveBtn}></i>
            </button>
            { faves }
        </>
    )
}

