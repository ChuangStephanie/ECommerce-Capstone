import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import NavItem from "./NavItem";
import { fetchAllProducts } from "../API";

const Nav = () => {
  const navigate = useNavigate();
  const { userLogged, setUserLogged } = useContext(UserContext);
  const [isHover, setIsHover] = useState(true);

  
  const handleLogout = () => {
    setUserLogged(false);
    navigate("/");
  };


//   const productsToDisplay = searchParams
//     ? products.filter((p) =>
//         p.name.toLowerCase().includes(searchParams.toLowerCase())
//       )
//     : [];
// bringing searchbar into navbar

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
          subItems={[{title:"Cart", link: "/cart"}, {title:"Wishlist", link: "wishlist"}]}
          isHover = {isHover}
          setIsHover = {setIsHover}
        />
        <NavItem
          title="Products"
          url="/products"
          subItems={[{title: "Keychains", link: "keychains"}, {title: "Plushies", link: "plushies"}, {title: "On Sale Items", link: "on-sale-items"}]}
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
