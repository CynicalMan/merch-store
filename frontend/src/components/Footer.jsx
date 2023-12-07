import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className="container">
        <footer className="py-3 my-4">
          <ul className="nav justify-content-center border-bottom pb-3 mb-3">
            <li className="nav-item">
            <Link to={"/"} className="nav-link px-2  text-decoration-none text-muted">
              <a href="" className="text-decoration-none text-dark ">
                Home
              </a>
              </Link>
            </li>
            <li className="nav-item">
            <Link to={"/products"} className="nav-link px-2  text-decoration-none text-muted">
              <a href="" className="text-decoration-none text-dark">
                Products
              </a>
              </Link>
            </li>
            <li className="nav-item ">
            <Link to={"/about"} className="nav-link px-2  text-decoration-none text-muted">
              <a href="" className="text-decoration-none text-dark">
                About me
              </a>
              </Link>
            </li>
          </ul>
          <p className="text-center text-muted">© 2023 Omar, Inc</p>
        </footer>
      </div>
    </>
  );
};

export default Footer;
