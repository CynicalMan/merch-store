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

export const Auth = ({email , password}) =>{
    const userData = {
        email : email,
        password : password
    }
    console.log(userData);
    const response = axios.post("http://localhost:4000/auth/login",userData);
    console.log(response);
    return response
}

