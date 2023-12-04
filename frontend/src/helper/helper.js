import axios from "axios"

export const SignupPost = ({
    email , password
})=>{
    const userData = {
        userMail: email,
        userPassword: password
    }
    const response = axios.post('https://jsonplaceholder.typicode.com/users', userData);
};

export const Auth = ({email , password}) =>{
    const userData ={
        userMail : email,
        userPassword : password
    }
    const response = axios.post("localhost",userData);
}

