// show all users
import React from "react";
import User from "./User";

export default function UsersView() {
  const [users, setUsers] = React.useState([]);
  const [faveCount, setFaveCount] = React.useState(0);
  const [newUser, setNewUser] = React.useState("");

  const getUsers = async () => {
    fetch("http://localhost:5000/users")
      .then( (res) => res.json() )
      .then( (allUsers) => setUsers(allUsers) )
      .catch( (e) => console.error(e.stack) );
  };

  const addUser = async () => {
    const inputBody = { name: newUser, email: "" };

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputBody),
    })
      .then( (res) => res.json() )
      .then( () => getUsers() )
      .catch( (e) => console.error(e.stack) );
  };

  // TODO: implement as a button
  const deleteUser = async (id) => {
    fetch( `http://localhost:5000/users/${id}`, { method: "DELETE" } )
      .then( () => setUsers( users.filter( (user) => user.uid !== id ) ) )
      .then( () => getUsers() )
      .catch( (e) => console.error(e.stack) );
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div>
        { users.map( (user) => (
          <div key={ user.uid }>
            <User user={ user } />
          </div>
        ) ) }
      </div>
      <div>
        <input type="text" onChange={ (e) => setNewUser(e.target.value) } />
        <button onClick={ addUser }>Add User</button>
      </div>
    </>
  );
}
