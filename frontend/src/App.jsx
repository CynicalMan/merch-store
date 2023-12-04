import Navbar from './components/Navbar'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Home from './views/Home/Home'
import Footer from './components/Footer'
import Signin from './views/Auth/Signin'
import Signup from './views/Auth/Signup'
import About from './views/About/About'
import Cart from './views/Cart/Cart'
function App() {

  return (
    <>
      <Navbar />
      <Home />
      {/* <About/> */}
      {/* <Signup/> */}
      {/* <Signin/> */}
      {/* <Footer /> */}

    </>
  )
}

export default App
