import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import base from '../Base/base';
import User from '../Base/User';
import '../CSS/registerlogin.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    const requestBody = { username, password };

    try {
      const response = await axios.post(`${base.BASE_URL}/users/login`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Login failed');
      } else {
        console.log('Login successful');
        const userUrl = `http://localhost:8080/users/${username}`;
        const user = new User(userUrl);
        user.saveLocal();
        
        navigate('/home');
      }
    } catch (error) {
      console.error('Login failed. Please try again.');
      alert('Username or password is not correct');
    }
  }

  return (
    <div className="registerlogin-container">
      <form className="registerlogin-form" onSubmit={handleSubmit}>
        <h1>Login to Waiyat World</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <div className="boxCircle col col12">
        <p>
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
