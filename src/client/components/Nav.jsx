import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import NavItem from "./NavItem";
import { fetchAllProducts } from "../API";

const Nav = () => {
  const navigate = useNavigate();
  const {
    userLogged,
    setUserLogged,
    products,
    setProducts,
    error,
    setError,
    searchParams,
    setSearchParams,
    isLoading,
    setIsLoading,
    getAllProducts,
    productsToDisplay,
  } = useContext(UserContext);
  const [isHover, setIsHover] = useState(false);

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
    <nav>
      <div className={`list-wrapper ${isHover && "onHoverNav"}`}>
      <ul>
        <NavItem
          title="Home"
          url="/"
          subItems={[""]}
          isHover={isHover}
          setIsHover={setIsHover}
        />
        <NavItem
          title="Cart"
          url="/cart"
          subItems={[
            { title: "Cart", link: "/cart" },
            { title: "Wishlist", link: "wishlist" },
          ]}
          isHover={isHover}
          setIsHover={setIsHover}
        />
        <NavItem
          title="Products"
          url="/products"
          subItems={[
            { title: "Keychains", link: "keychains" },
            { title: "Plushies", link: "plushies" },
            { title: "On Sale Items", link: "on-sale-items" },
          ]}
          isHover={isHover}
          setIsHover={setIsHover}
        />
        {userLogged ? (
          <li className="list-item">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          </li>
        ) : (
          <NavItem
            title="Login"
            url="/login"
            subItems={[""]}
            isHover={isHover}
            setIsHover={setIsHover}
          />
        )}
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search Products"
            onChange={(e) => setSearchParams(e.target.value)}
          />
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {error ? (
                <p className="error-message">{error}</p>
              ) : (
                <div className="productscontainer">
                    {productsToDisplay.length > 0 ? <p>{ productsToDisplay.length} products found</p> : "" }
                  {productsToDisplay.length === 0 ? (
                    <p>{/* No products found. <a href="/">Go to Home</a> */}</p>
                  ) : (
                    productsToDisplay.map((product) => (
                      <div key={product.id} className="indivproduct">
                        <h3>
                          <Link to={`/${product.id}`}>{product.name}</Link>
                        </h3>
                        <p>{product.price}</p>
                        {/* write if/else code here to control whether or not edit/delete buttons show up */}
                        {/* buttons should only show for admin user */}
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </ul>
      </div>
    </nav>
  );
};

export default Nav;
