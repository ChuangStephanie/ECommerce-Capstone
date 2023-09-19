const baseURL = "https://localhost:5432/lizardsplushies";

export async function fetchAllProducts() {
    try {
        const response =  await fetch(`${baseURLI}/api/products`);
        const productsAPI =  await response.json();
        console.log("Fetched all products", productsAPI);
    } catch (error) {
        console.log(error, "No products were fetched");
    }
}