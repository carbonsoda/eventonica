// show all users
import React from 'react';
import User from './User';

export default function UsersView() {
    const [users, setUsers] = React.useState([]);
    const [faveCount, setFaveCount] = React.useState(0);

    const getUsers = async () => {
        try {
            const res = await fetch('http://localhost:5000/users');
            const allUsers = await res.json();
            console.log(allUsers);
            setUsers(allUsers);
        } catch (error) {
            console.error(error);
        }
    }

    React.useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            {
                users.map((user) => (
                    <User user={user} />
                ))
            }          
        </div>
    )
}

