const baseURL = "https://localhost:3000";

export async function fetchAllProducts() {
    try {
        const response =  await fetch(`${baseURL}/api/products`);
        const result =  await response.json();
        console.log("Fetched all products", result.users);
    } catch (error) {
        console.log(error, "No products were fetched");
    }
}