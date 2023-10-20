import { useState, useEffect } from "react";
import {
  fetchAllUsers,
  fetchAllProducts,
  fetchSingleProduct,
  deleteProduct,
  makeProduct,
  editProduct,
} from "../API";
import { useNavigate, useParams } from "react-router-dom";
import { baseURL } from "../API";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [onSale, setOnSale] = useState("");
  const [image, setImage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const {productId} = useParams();
  const navigate = useNavigate();
  const isAdmin = sessionStorage.getItem("email");
  console.log("Admin?", isAdmin);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const response = await fetchAllUsers();
        if (response) {
          setUsers(response.users);
        } else {
          setError(console.error("No users found"));
        }
      } catch (error) {
        setError(console.error("Error fetching users"));
      }
    }
    async function getSingleProductData() {
      try {
        const productData = await fetchSingleProduct(productId);
        if (productData) {
          console.log("one item", productData.product)
          setProduct(productData.product);
        } else {
          setError("No product fetched");
        }
      } catch (error) {
        setError("Error fetching product data");
      }
    }
    async function getAllProducts() {
      try {
        const productsData = await fetchAllProducts();
        if (productsData) {
          console.log("products", productsData);
          setProducts(productsData);
        } else {
          setError(console.error("No products found"));
        }
      } catch (error) {
        setError(console.error("Error fetching products"));
      }
    }
    getSingleProductData();
    getAllUsers();
    getAllProducts();
  }, [productId]);

  console.log("users", users);

  //handles
0
  const handleDelete = async () => {
    try {
      const response = await deleteProduct(product.id);
      if (response.success) {
        navigate("/admin"); // Redirect to another page after successful deletion
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError("An error occurred while deleting the product.");
    }
  };

  const formVisible = () => {
    setShowForm(!showForm);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            price,
            description,
            category,
            onSale,
            image,
          },
        ),
      });

      const result = await response.json();
      console.log("result", result);

      // Redirect to the AllPosts page after successful post creation
      if (response.ok) {
        navigate("/admin");
      } else {
        window.alert("error creating product");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="users">
        <h1>Users</h1>
        {isAdmin ? (
          <button className="newbutton" onClick={formVisible}>
            Create Product
          </button>
        ) : (
          <p>Log in to create post</p>
        )}
        {showForm ? (
          <form className="newform" onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              Category:
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
            <label>
              On Sale:
              <input
                type="checkbox"
                checked={onSale}
                onChange={(e) => setOnSale(e.target.checked)}
              />
            </label>
            <label>
              Image URL:
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
            <button>Submit Product</button>
          </form>
        ) : (
          <p></p>
        )}
        <div className="userinfo">
          {isAdmin ? (
            users.map((user) => {
              return (
                <div className="user">
                  <h4>{user.name}</h4>
                  <p>{user.id}</p>
                  <p>{user.email}</p>
                </div>
              );
            })
          ) : (
            <p>User is not authorized to view this page</p>
          )}
        </div>
      </div>
      <div className="productlist">
        {isAdmin ? (
          products.map((product) => {
            return (
              <>
                <div className="products2">
                  <h3>{product.name}</h3>
                  <p>Id: {product.id}</p>
                  <img
                    className="productimg"
                    src={product.image}
                    style={{ width: 100 }}
                  />
                  <button>Edit</button>
                  <button onClick={handleDelete}>Delete</button>
                </div>
              </>
            );
          })
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
