import React, { useContext, useState } from 'react';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
const Login = () => {
  const {userLogged, setUserLogged} = useContext(UserContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async() => {
    try {
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                email,
                password
            })
        });
        const result = await response.json();
        setMessage(result.message);
        if(!response.ok) {
          throw(result)
        }
        setEmail('');
        setPassword('');
        setUserLogged(true)
    } catch (err) {
        console.error(`${err.name}: ${err.message}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    const navigate = useNavigate();
  navigate("/home")
  };


  return (
    <div>
      <h2>Login</h2>
      <form className="Login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'></label>
          <input
            placeholder='Email'
            id='email'
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'></label>
          <input
            placeholder='Password'
            id='password'
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button className="login-btn" type='submit'>Login</button>
        </form>
        {/* <button onClick={() => navigate("/Register")}>Sign up here</button> */}
        <Link className="register-link" to={"/register"}>
          Don't have an account? Register here!
        </Link>
      
      <p>{message}</p>
    </div>

  );
};

export default Login;
