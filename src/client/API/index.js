const baseURL = "http://localhost:3000";

export async function fetchAllProducts() {
    try {
        const response =  await fetch(`${baseURL}/api/products`);
        const result =  await response.json();
        return result.products;
    } catch (error) {
        console.log(error, "No products were fetched");
    }
}