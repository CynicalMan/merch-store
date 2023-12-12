import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket, faUserPlus, faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { openCartBar } from '../redux/cart/cartSlice'
import { useState } from 'react'
import AuthService from '../services/AuthService'

const Navbar = () => {

    const products = useSelector((state) => state.products)
    const cart = useSelector((state) => state.cartState.value)
    console.log(cart);
    const [openNavbar , setOpenNavbar] = useState(false)
    const dispatch = useDispatch();
    const handleCartBar = () => {
        dispatch(openCartBar(true));
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm" >
            <div className="container">
                <Link to={"/"} className="navbar-brand fw-bold fs-4">Abo3mo Collection</Link>
                <button className="navbar-toggler" type="button" onClick={()=>{setOpenNavbar(!openNavbar)}} data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${openNavbar?`show text-center`:``} `} id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link " aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/products"} className="nav-link text-decoration-none">
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                        <Link to={"/about"} className="nav-link text-decoration-none">
                                About
                            </Link>
                        </li>

                    </ul>
                    <div className="buttons">
                        { !AuthService.isAuthenticated()  && <Link to={"/signup"} onClick={() => {AuthService.logout()}} className="btn btn-outline-dark  "><FontAwesomeIcon icon={faUserPlus} className='me-1' />Register</Link>}
                        { !AuthService.isAuthenticated()  && <Link to={"/signin"} onClick={() => {AuthService.logout()}} className="btn btn-outline-dark ms-2"><FontAwesomeIcon icon={faArrowRightToBracket} className='me-2' />Login</Link>}
                        { AuthService.isAuthenticated()  && <Link to={"/"} onClick={() => {AuthService.logout();window.location.reload()}} className="btn btn-outline-dark ms-2"><FontAwesomeIcon icon={faUserPlus} className='me-1' />Logout</Link>}
                        <button onClick={handleCartBar} className="btn btn-outline-dark ms-2"><FontAwesomeIcon icon={faCartShopping} className='me-1' />Cart ({products.totalQuantity})</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
