const baseURL = "http://localhost:3000";

export async function fetchAllProducts() {
    try {
        const response =  await fetch(`${baseURL}/api/products`,);
        const result =  await response.json();
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
        console.log("List of users", result.users)
        return result;
    } catch (error) {
        console.error(error, "No users were fetched");
    }
}