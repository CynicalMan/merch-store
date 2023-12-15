import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addItem, delItem } from "../redux/product/productSlice";
import Cart from "../views/Cart/Cart";
import AuthService from "../services/AuthService";
import { checkoutPost } from "./helper";
export const LoadingProducts = () => {
  return (
    <>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
    </>
  );
};

export const LoadingProduct = () => {
  return (
    <>
  
      <div className="col-md-6">
        <Skeleton height={460} />
      </div>
      <div className="col-md-6 lh-lg">
        <Skeleton height={30} width={300} />
        <Skeleton height={115} />
        <Skeleton height={30} width={150} />
        <Skeleton height={50} />
        <Skeleton height={150} />
        <div className="d-flex">
          <Skeleton height={40} width={130} />
          <Skeleton height={40} width={130} className="ms-2" />
        </div>
      </div>
    </>
  );
};



export const ShowCart = ({ cartItems , totalQuantity , totalAmount  }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.value)
  console.log(products)
  console.log(totalAmount)
  const delProductToCart = (prodId) => {
    dispatch(delItem(prodId));
  };
  return (
    <>
      <div className="container">
        {products?
        products.map((res) => {
          return (
            <>
              <div className="ms-2 p-2" key={res.id}>
                <div className="row rounded-3 d-flex h-50 p-2 border border-2 shadow-sm">
                  <div className="col-4 " >
                    <img src={`http://localhost:4000/uploads/${res.images[0]}`} className="w-100 " alt="" />
                  </div>
                  <div className="col-8  ">
                    <div className="text-truncate">Title: {res.title}</div>
                    <div>SubTotal: {RoundingNumber(res.price * res.qty)} EGP</div>
                    <div className="d-flex justify-content-between pt-1">
                      <div className="col-3 w-50 mt-2">Qty: {res.qty} </div>
                      <div className="col-8 w-50"> <button onClick={() => delProductToCart(res._id)} className="btn btn-dark btn-sm mt-1 ">Remove</button></div>
                  </div>
                  </div>
                </div>
              </div>
            </>
          );
        }) : "Cart is empty"}
        <div className="">
        <div className="row p-3 bg-info border bg-dark-subtle rounded-top-4 text-dark " >
          <div className="d-flex fw-bolder  justify-content-between">
            <div className="text-muted">Total Amount  </div>
            <div>{RoundingNumber(totalAmount)} EGP</div>
            </div>
        </div>
        <div className="row">
          
        {AuthService.isAuthenticated() && <Link to={"/checkout"} className="btn btn-dark rounded-bottom-4  text-decoration-none text-light">
          Checkout
          </Link>}
          {!AuthService.isAuthenticated() && <Link to={"/signup"} className="btn btn-dark rounded-bottom-4  text-decoration-none text-light">
          Register to add products
          </Link>}
         </div>
        </div>
      </div>
    </>
  );
};

export const RoundingNumber = (number)=>{
  return Math.round((number + Number.EPSILON) * 100) / 100;
};



export const ShowProducts = ({ results }) => {
  const [products, setProducts] = useState(results);
  
  const filterProducts = (category) => {
    const updatedList = results.filter((x) => x.category === category);
        setProducts(updatedList);
        console.log(products);
      };

      return (
        <>
          <div className="buttons d-flex justify-content-center mb-5">
            <button
              onClick={() => {
                setProducts(results);
              }}
              className="btn btn-outline-dark"
            >
              All
            </button>
            <button
              onClick={() => {
                filterProducts("men's clothing");
              }}
              className="btn btn-outline-dark ms-2"
            >
              Men's Clothing
            </button>
            <button
              onClick={() => {
                filterProducts("women's clothing");
              }}
              className="btn btn-outline-dark ms-2"
            >
              Women's Clothing
            </button>
          </div>
          {products.map((res) => {
            return (
              <div className="col-xl-3 col-lg-4 col-x col-md-6 g-4 " key={res.id}>
                <div className="card h-100 text-center p-4  border-2 shadow-sm">
                  <img
                    src={`http://localhost:4000/uploads/${res.images[0]}`}
                    className="card-img-top p-sm-5"
                    height={250}
                    alt={res.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0 text-truncate">{res.title}</h5>
                    <p className="card-text lead fw-bold">{res.price} EGP</p>
                    { !AuthService.isAuthenticated() && <Link to={`/signup`} className="btn btn-outline-dark"> Buy Now </Link>}
                    { AuthService.isAuthenticated() && <Link to={`/products/${res._id}`} className="btn btn-outline-dark"> Buy Now </Link>}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
};



export const ShowProduct = ({ product }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.value)

  const addProductToCart = (product) => {
    dispatch(addItem(product));
  };

  console.log(product);

  return (
    <>
      <div className="col-md-6 text-center">
        <img src={`http://localhost:4000/uploads/${product.images[0]}`} alt={product.title} height={400} width={400} />
      </div>
      <div className="col-md-6">
        <h4 className="text-uppercase text-black-50">{product.category}</h4>
        <h1 className="display-5">{product.title}</h1>
        <p className="lead fw-bolder">
          Rating {product.rating}
          <FontAwesomeIcon icon={faStar} />
        </p>
        <h3 className="display-6 fw-bold my-4">{product.price} EGP</h3>
        <p className="lead">{product.description}</p>
        <button
          onClick={() => addProductToCart(product)}
          className="btn btn-outline-dark px-4 py-2"
        >
          Add to Cart
        </button>
        <Link to={"/checkout"} className="btn btn-dark ms-2 px-3 py-2">
          Go to checkout
        </Link>
      </div>
    </>
  );
};

export const getProducts = async () => {
  const response = await fetch("http://localhost:4000/product/");
  const results = await response.json();
  console.log(results);
  return results;
};

export const getProduct = async ({ params }) => {
  const response = await fetch(
    `http://localhost:4000/product/getProduct/${params.id}`
  );
  const result = await response.json();
  return result;
};
