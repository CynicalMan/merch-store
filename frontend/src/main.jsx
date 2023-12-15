import React from 'react'
import ReactDOM from 'react-dom/client'
import App , {loader as appLoader} from './App.jsx'
import './index.css'
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import ErrorPage from './views/ErrorPage/ErrorPage.jsx'
import Product, {loader as productLoader} from './views/Product/Product.jsx'
import {Provider} from "react-redux"
import { store } from './redux/store.js'
import Signin, { signinAction } from './views/Auth/Signin.jsx'
import Signup, { signupAction }  from './views/Auth/Signup.jsx'
import Checkout, { checkoutFunction } from './views/Checkout/Checkout.jsx'
import About from './views/About/About.jsx'
import Products ,{ loader as productsLoader } from './views/Products/Products.jsx'
import Home ,{ loader as homeLoader }from './views/Home/Home.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: appLoader,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: homeLoader
      },
      {
        path: "/products",
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: "/products/:id",
        element: <Product />,
        loader: productLoader
      },
      {
        path: "/about",
        element: <About />,
      },
    ]
  },
  {
    path: "/checkout",
    element: <Checkout />,
    action: checkoutFunction
  },
  {
    path: "/signin",
    element: <Signin />,
    action: signinAction
  },
  {
    path: "/signup",
    element: <Signup />,
    action: signupAction,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
