import React, { useState } from 'react';
import { useAuth } from '../../utils/Authcontext';
import { useNavigate } from 'react-router-dom';
import './style.scss'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token, data.user);
        alert(`Login successful! Welcome ${data.user.firstname} ${data.user.lastname}`);  // Use the firstname and lastname from the response
        navigate('/'); 
      } else {
        throw new Error(data.error || 'Failed to login');
      }
    } catch (error) {
      alert(`Login error: ${error.message}`);
    }
  };

  return (
    <div className='login-page'>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="form-input">
              <img className='svg' src="person.svg" alt="person.svg" />
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="form-input">
              <img src="password.svg" alt="password.svg" />
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
