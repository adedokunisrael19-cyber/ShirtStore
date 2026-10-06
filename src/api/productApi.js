const API_URL = `${import.meta.env.VITE_API_URL}/products`

export const getProducts = 
    async () => {
        const response = await fetch(API_URL);

        if(!response.ok){
            throw new Error ('failed to fetch products');
        }

        const data = await response.json();

        return data.products;

    };
