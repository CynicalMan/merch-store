import axios from "axios"

export const SignupPost = ({
    email , password
})=>{
    const userData = {
        email: email,
        password: password
    }
    const response = axios.post('http://localhost:4000/auth/register', userData);
    return response
};

export const Auth = async  ({email , password}) =>{
    const userData = {
        email : email,
        password : password
    }
    console.log(userData);
    const response = await axios.post("http://localhost:4000/auth/login",{
        email : "admin@gmail.com",
        password : "admin"
    });
    console.log(response);
    return response
}

