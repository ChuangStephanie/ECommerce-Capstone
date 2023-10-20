import { useState, useEffect } from "react";
import { fetchAllUsers, fetchAllProducts } from "../API";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const isAdmin = sessionStorage.getItem("email");
  console.log("Admin?", isAdmin);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await fetchAllUsers();
        if (response) {
          console.log("response", response);
          setUsers(response.users);
        } else {
          setError(console.error("No users found"));
        }
      } catch (error) {
        setError(console.error("Error fetching users"));
      }
    }
    async function getAllProducts(){
      try {
        const productData = await fetchAllProducts();
        if (productData) {
          console.log("products", productData);
          setProducts(productData);
        } else {
          setError(console.error("No products found"))
        }
      } catch (error) {
        setError(console.error("Error fetching products"));
      }
    }
    getAllUsers();
    getAllProducts();
  }, []);

  console.log("users", users);

  return (
    <>
      <h1 className="users">Users</h1>
      <div className="userinfo">
        {isAdmin ? users.map((user) => {
          return (
            <div className="user">
              <h4>{user.name}</h4>
              <p>{user.id}</p>
              <p>{user.email}</p>
            </div>
          )
        }) : <p>User is not authorized to view this page</p>}
      </div>
    </>
  );
}
