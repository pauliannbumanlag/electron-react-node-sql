import React, { useState, useEffect } from "react";
import '.App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));   
  }, []);

  const handleAddUser = () => {
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newUserName }),
    })
      .then(response => response.json())
      .then(data => setUsers([...users, { id: data.id, name: newUserName }]))
      .catch(error => console.error('Erro adding user:', error));

    setNewUserName('');
  };

  return (
    <div className="App">
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newUserName}
          onChange={e => setNewUserName(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
}

export default App;