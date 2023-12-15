import axios from "axios"
import Cookies from 'js-cookie';

let filesFound = []

export const handleFiles = ({ files }) => {
    if (files) {
        filesFound = files
        return true
    }
    return false
}

export const addProduct = async ({ title, description, category, price }) => {

    const formData = new FormData();
    filesFound.forEach((file, index) => {
        formData.append("images", file);
    });
    formData.append("title",title)
    formData.append("description",description)
    formData.append("category",category)
    formData.append("price",price)
    console.log(Object.fromEntries(formData));
    if (!(Cookies.get('authToken') !== undefined)){
        return null
    }
    console.log(1);
    const authToken = Cookies.get('authToken') 
    const response = await axios.post("http://localhost:4000/product/addProduct", formData, {
        headers: {
            'content-type': 'multipart/form-data',
            "Authorization" : "Bearer " + authToken
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
  