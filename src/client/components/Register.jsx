import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const register = async () => {
    try {
      const response = await fetch('https://lizardsplushies.netlify.app/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const result = await response.json();
      setMessage(result.message);
      if (response.ok) {
        toast.success('Registration successful');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        throw result;
      }
    } catch (err) {
      toast.error('Please provide the necessary information to register');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  return (
    <div className="register-container">
      <h2 style={{ marginBottom:'15px', fontSize: '28px' }}>Register New Account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            
          />
        </div>
        <button className="register-btn" type="submit">
          Register
        </button>
      </form>
      <p className="message">{message}</p>
    </div>
  );
};

export default Register;
