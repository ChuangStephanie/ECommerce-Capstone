import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";


const Nav = () => {
    const navigate = useNavigate()
    const { userLogged, setUserLogged } = useContext(UserContext)
    const handleLogout = () => {
        setUserLogged(false)
        navigate("/")
    }
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/cart">Cart</Link>
                </li>
                <li>
                {userLogged ?
                    (<button onClick={handleLogout}>Logout</button>) :
                    (<Link to="/login">Login</Link>) 
                }
                </li>
                {/* <li>
                    <Link to="/register">Register</Link>
                </li> */}

            </ul>
        </nav>
    );
};

export default Nav;
