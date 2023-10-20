export const baseURL = "https://lizardsplushies.onrender.com";

export async function fetchAllProducts() {
  try {
    const response = await fetch(`${baseURL}/api/products`);
    const result = await response.json();
    return result.products;
  } catch (error) {
    console.error(error, "No products were fetched");
  }
}

export async function fetchSingleProduct(productId) {
  try {
    const response = await fetch(`${baseURL}/api/products/${productId}`);
    const result = response.json();
    console.log("single product", result);
    return result;
  } catch (error) {
    console.error("No product was fetched", error);
  }
}

export async function fetchAllUsers() {
  try {
    const response = await fetch(`${baseURL}/api/users`);
    const result = response.json();
    console.log("List of users", result);
    return result;
  } catch (error) {
    console.error(error, "No users were fetched");
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await fetch(`${baseURL}/products/${product.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting product", error);
  }
}

export async function makeProduct(productData) {
    try {
      const response = await fetch(`${baseURL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: productData }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error creating product", error);
    }
  }

  export async function editProduct(productData) {
    try {
      const response = await fetch(`${baseURL}/products`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product: productData }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error updating product", error);
    }
  }




