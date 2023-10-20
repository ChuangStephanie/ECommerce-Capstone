import { useState, useEffect } from "react";
import { fetchAllUsers } from "../API";

export default function Admin() {
  const [users, setUsers] = useState([]);
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
    getAllUsers();
  }, []);

  console.log("users", users);

  return (
    <>
      <h2>Users</h2>
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
        {/* {users.map((user) => {
            return (
                <div className="user">
                    <h4>{user.name}</h4>
                    <p>{user.id}</p>
                    <p>{user.email}</p>
                </div>
            )
        })} */}
      </div>
    </>
  );
}
