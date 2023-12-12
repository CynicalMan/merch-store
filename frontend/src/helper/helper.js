import axios from "axios"

export const SignupPost = async ({
    email, password,name,phone,address
}) => {
    const userData = {
        email: email,
        password: password,
        name: name,
        phone: phone,
        address: address,
    }
    console.log(userData);
    const response = await axios.post('http://localhost:4000/auth/register',userData);
    return response
};

export const Auth = async ({ email, password }) => {
    const userData = {
        email: email,
        password: password
    }
    console.log(userData);
    const response = await axios.post("http://localhost:4000/auth/login", userData);
    console.log(response);
    return response
}

export const checkoutPost = async ({ userData }) => {
    const orderData = userData
    console.log(orderData);
    const response = await axios.post('http://localhost:4000/order/addOrder/',orderData);
    console.log(response);
    return response
};