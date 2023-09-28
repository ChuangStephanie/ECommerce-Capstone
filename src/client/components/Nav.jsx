import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import NavItem from "./NavItem";

const Nav = () => {
  const navigate = useNavigate();
  const { userLogged, setUserLogged } = useContext(UserContext);
  const [isHover, setIsHover] = useState(true);
  
  const handleLogout = () => {
    setUserLogged(false);
    navigate("/");
  };

  return (
    <nav className={`${isHover && "onHoverNav"}`}>
      <ul>
        <NavItem
          title="Home"
          url="/"
          subItems={[""]}
          isHover = {isHover}
          setIsHover = {setIsHover}
        />
        <NavItem
          title="Cart"
          url="/cart"
          subItems={["Cart", "Wishlist"]}
          isHover = {isHover}
          setIsHover = {setIsHover}
        />
        <NavItem
          title="Products"
          url="/products"
          subItems={["Keychains", "Plushies", "On Sale Items"]}
          isHover = {isHover}
          setIsHover = {setIsHover}
        />
        {userLogged ? (
            <NavItem
            title="Logout"
            url=""
            subItems={[""]}
            isHover = {isHover}
            setIsHover = {setIsHover}
            onClick={handleLogout}
          />
        ) : (
            <NavItem
            title="Login"
            url="/login"
            subItems={[""]}
            isHover = {isHover}
            setIsHover = {setIsHover}
          />
        )}
      </ul>
    </nav>
  );
};

export default Nav;
