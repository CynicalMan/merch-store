import Navbar from './components/Navbar'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Signin from './views/Auth/Signin'
import Signup from './views/Auth/Signup'
import About from './views/About/About'

import { getProducts } from './helper/helper'

export async function loader() {
  const products = await getProducts();
  console.log(products);
  return {products};
}


function App() {

  return (
    <>
      <Navbar />
      <Outlet /> 
      <Footer />
    </>
  )
}

export default App
