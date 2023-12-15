import Cookies from 'js-cookie';

const AuthService = {
    login: (userData) => {
        const { authToken, userID } = userData;
        // Logic to authenticate user and set cookie upon successful login
        Cookies.set('authToken', userData.authToken , { expires: 1 }); // Set a cookie with an expiration of 1 day
        Cookies.set('userID', userData.userID , { expires: 1 }); // Set a cookie with an expiration of 1 day
    },
    logout: () => {
        // Logic to log out the user and remove the authentication cookie
        Cookies.remove('authToken');
        Cookies.remove('userID');
        localStorage.clear()
    },
    isAuthenticated: () => {
        // Check if the authentication cookie exists
        return Cookies.get('authToken') !== undefined;
    },
    getUserId: () => {
        return Cookies.get('userID') 
    },
    getAuthToken: () => {
        return Cookies.get('authToken') 
    },
};

export default AuthService;
