import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

interface User {
  id: number;
  name: string;
  email: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching users: ", error);
    }
  };

  const createUser = async () => {
    try {
      console.log("inserted");
      
      const response = await axios.post("http://localhost:3000/users", { name, email });
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setName("");
      setEmail("");
    } catch (error) {
      console.log("Error creating user: ", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      console.log("hdhid",id)
      await axios.delete(`http://localhost:3000/users?id=${id}/`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.log("Error deleting user: ", error);
    }
  };

  return (
    <div>
      <h2>Fill User Details</h2>
      <form onSubmit={createUser}>
        <input
          type="text" 
          placeholder="Name" className="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        
        />
        <input
          type="email"
          placeholder="Email"  className="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" >Add User</button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
