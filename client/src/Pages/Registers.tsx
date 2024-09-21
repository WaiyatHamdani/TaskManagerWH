import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import base from '../Base/base';
import '../CSS/registerlogin.css';

function Registers() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const requestBody = { firstname,
                          lastname,
                          username, 
                          password 
                        };

    console.log(`${base.BASE_URL}/users/register`)
    try {
      const response = await axios.post("http://localhost:8080/users/register", requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Registration failed');
      } else {
        console.log('Registration successful');
        alert(`Successfully registered ${username}`);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Error during registration. Please try again.');
    }
  }

  return (
    <div className="registerlogin-container">
      <form className="registerlogin-form" onSubmit={handleSubmit}>
        <h1>Register User</h1>
        <label htmlFor="username">Firstname</label>
        <input
          type="text"
          id="firstname"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="Username"
          required
        />

        <label htmlFor="username">Lastname</label>
        <input
          type="text"
          id="lastname"
          value={firstname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Username"
          required
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <div>
        <div className='button'>
          <Link to="/">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Registers;
