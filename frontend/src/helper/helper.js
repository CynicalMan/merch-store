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

let userDataGlobal = {}
export const getOrderLocalStorage = ({value , userID}) => {
  console.log(value);
  let _id , qty ;
  let products = [];
  for (let index = 0; index < value.length; index++) {
    _id = value[index]._id;
    qty = value[index].qty;
    products.push({ productId :_id , quantity: qty})    
  }
  const userData = {
    userID: userID,
    products:products
  }
  if(userData){
    console.log(userData);
    userDataGlobal = userData
  }
  console.log(userDataGlobal);
  return userData;
}
console.log(userDataGlobal);

export const IOrderData = () => {
  console.log(userDataGlobal);
  return userDataGlobal
}

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
    console.log(userData);
    const orderData = userData
    console.log(orderData);
    const response = await axios.post('http://localhost:4000/order/addOrder/',orderData);
    console.log(response);
    return response
};