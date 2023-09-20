const baseURL = "http://localhost:3000";

export async function fetchAllProducts() {
    try {
        const response =  await fetch(`${baseURL}/api/products`);
        console.log("Fetch response", response);
        const result =  await response.json();
        console.log("Fetched all products", result);
    } catch (error) {
        console.log(error, "No products were fetched");
    }
}