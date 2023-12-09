import axios from "axios"

export const addProduct = async ({ title, description , category , price , images}) => {
    const productData = {
        title: title,
        description: description,
        category: category,
        price: price,
        images: images,
    }
    console.log(productData);
    const response = await axios.post("http://localhost:4000/product/addProduct", productData,{
        headers : {
            'Content-Type': 'multipart/form-data'
        }
    });
    console.log(response);
    return response
}

export const getOrders = async () => {
    const response = await fetch(
      `http://localhost:4000/order/`
    );
    console.log(response);
    const result = await response.json();
    return result;
  };
  