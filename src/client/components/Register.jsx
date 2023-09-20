import React, { useState } from 'react';

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

  const register = async() => {
    try {
        const response = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                name,
                email,
                password
            })
        });
        const result = await response.json();
        setMessage(result.message);
        if(!response.ok) {
          throw(result)
        }
        setName('')
        setEmail('');
        setPassword('');
    } catch (err) {
        console.error(`${err.name}: ${err.message}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='name'
            id='name'
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type='submit'>Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Register;
