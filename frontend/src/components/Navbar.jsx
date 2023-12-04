import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket,faUserPlus,faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {

    const product = useSelector((state) => state.value)
    console.log(product)
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm" >
            <div className="container">
                <Link to={"/"} className="navbar-brand fw-bold fs-4">Abo3mo Collection</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link active" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/products"} className="nav-link">Products</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">About me</a>
                        </li>

                    </ul>
                    <div className="buttons">
                        <a className="btn btn-outline-dark "><FontAwesomeIcon icon={faArrowRightToBracket} className='me-1' />Login</a>
                        <a className="btn btn-outline-dark ms-2"><FontAwesomeIcon icon={faUserPlus} className='me-1' />Register</a>
                        <a className="btn btn-outline-dark ms-2"><FontAwesomeIcon icon={faCartShopping}  className='me-1' />Cart ({product.length})</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
