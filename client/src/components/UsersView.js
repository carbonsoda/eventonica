// show all users
import React from 'react';
import User from './User';

export default function UsersView() {
    const [users, setUsers] = React.useState([]);
    const [faveCount, setFaveCount] = React.useState(0);

    const getUsers = async () => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(allUsers => setUsers(allUsers))
            .catch(e => console.error(e.stack));
    }

    React.useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            {
                users.map((user) => (
                    <div key={ user.uid }>
                        <User user={ user } />
                    </div>
                ))
            }
        </div>
    )
}

