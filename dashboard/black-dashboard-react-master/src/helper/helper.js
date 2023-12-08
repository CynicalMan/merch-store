import axios from "axios"

export const addProduct = async ({ title, description , category , price , image}) => {
    const productData = {
        title: title,
        description: description,
        category: category,
        price: price,
        image: image,
    }
    console.log(productData);
    const response = await axios.post("http://localhost:4000/product/addProduct", productData);
    console.log(response);
    return response
}
