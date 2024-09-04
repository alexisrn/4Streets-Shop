const API_BASE_URL = "https://dummyjson.com";

const fetchBaseURL = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Erro: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};


export const getProducts = async () => {
    return await fetchBaseURL("products");
  };
export const getProductsID = async (id:string) => {
    return await fetchBaseURL(`products/${id}`);
  };

  export const getCategoryProducts = async (category: string ) => {
    return await fetchBaseURL(`products/category/${category}`);
  };

  export const getMensShirts = async () => {
    return await fetchBaseURL("products/category/mens-shirts");
  };
  export const getMenShoes = async () => {
    return await fetchBaseURL("products/category/mens-shoes");
  };

  export const getSunglasses = async () => {
    return await fetchBaseURL("products/category/sunglasses")
  }