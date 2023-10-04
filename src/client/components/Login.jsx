import React, { useContext, useState } from 'react';
import { UserContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const { userLogged, setUserLogged } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState(''); // New state for password error

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Clear the password error message when the user starts typing a new password
    setPasswordError('');
  };

  const login = async () => {
    try {
      // Check password length before sending the request
      if (password.length < 6) {
        setPasswordError('Password is too short (minimum 6 characters)');
        return; // Don't proceed with the login if the password is too short
      }

      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();
      setMessage(result.message);
      if (!response.ok) {
        throw result;
      }
      setEmail('');
      setPassword('');
      setUserLogged(true);
      navigate ("/")
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div>
      <h2>Login</h2>
      <form className="Login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email"></label>
          <input
            placeholder="Email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            placeholder="Password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            type="password"
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <button className="login-btn" type="submit">
          Login
        </button>
      </form>
      <Link className="register-link" to="/register">
        Don't have an account? Register here!
      </Link>
      <p>{message}</p>
    </div>
  );
};

export default Login;