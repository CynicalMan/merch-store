import Navbar from './components/Navbar'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Signin from './views/Auth/Signin'
import Signup from './views/Auth/Signup'
import About from './views/About/About'
import Cart from './views/Cart/Cart'

import { getProducts } from "./helper/compHelper"
import ScrollToTop from './components/ScrollToTop'

export async function loader() {
  const products = await getProducts();
  console.log(products);
  return {products};
}

function App() {

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Cart />
      <Outlet /> 
      <Footer />
    </>
  )
}

export default App
