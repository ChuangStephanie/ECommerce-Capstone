import React, { useContext, useState } from 'react';
import { UserContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const { userLogged, setUserLogged } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const login = async () => {
    try {
      if (password.length < 6) {
        setPasswordError('Password is too short (minimum 6 characters)');
        toast.error('Password is too short (minimum 6 characters)', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
        });
        return;
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
      navigate('/');
      toast.success('Login successful!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (err) {
      console.error(`${err.name}: ${err.message}`);
      toast.error('Login failed. Please check your credentials.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  function isAdmin(){
    if (email == "MxJChuang@money.com") {
      sessionStorage.setItem("email", email);
      return;
    } else {
      return;
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    isAdmin();
  };

  return (
    <div className="login-container">
      <h2 style={{marginBottom:'20px', fontSize: '28px'}}>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            placeholder="Enter your email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            type="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            placeholder="Enter your password"
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