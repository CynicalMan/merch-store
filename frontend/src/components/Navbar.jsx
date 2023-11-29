import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket,faUserPlus,faCartShopping } from "@fortawesome/free-solid-svg-icons"
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm" >
            <div className="container">
                <a className="navbar-brand fw-bold fs-4" href="#">Abo3mo Collection</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Products</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About me</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                    </ul>
                    <div className="buttons">
                        <a href="" className="btn btn-outline-dark "><FontAwesomeIcon icon={faArrowRightToBracket} className='me-1' />Login</a>
                        <a href="" className="btn btn-outline-dark ms-2"><FontAwesomeIcon icon={faUserPlus} className='me-1' />Register</a>
                        <a href="" className="btn btn-outline-dark ms-2"><FontAwesomeIcon icon={faCartShopping}  className='me-1' />Cart (0)</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
