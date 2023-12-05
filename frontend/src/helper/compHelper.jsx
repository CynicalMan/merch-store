import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faStar} from "@fortawesome/free-solid-svg-icons"

import { useDispatch } from "react-redux";
import { addItem } from '../redux/product/productSlice';

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
    )
}

export const LoadingProduct = () => {
    return (
        <>
            <div className="col-md-6">
                <Skeleton height={460}  />
            </div>
            <div className="col-md-6 lh-lg"> 
                <Skeleton height={30} width={300} />
                <Skeleton height={115}  />
                <Skeleton height={30} width={150} />
                <Skeleton height={50} />
                <Skeleton height={150} />
                <div className='d-flex'>
                    <Skeleton height={40} width={130} />
                    <Skeleton height={40} width={130} className='ms-2' />
                </div>
            </div>
        </>
    )
}



export const ShowProducts = ({ results })  => {
    const [products, setProducts] = useState(results)

    const filterProducts = (category) => {
        const updatedList = results.filter((x) => x.category === category)
        setProducts(updatedList)
        console.log(products);
    }

    return (
        <>
            <div className="buttons d-flex justify-content-center mb-5 pb-5">
                <button onClick={() => { setProducts(results) }} className="btn btn-outline-dark">All</button>
                <button onClick={() => { filterProducts("men's clothing") }} className="btn btn-outline-dark ms-2">Men's Clothing</button>
                <button onClick={() => { filterProducts("women's clothing") }} className="btn btn-outline-dark ms-2">Women's Clothing</button>
            </div>
            {products.map((res) => {
                return (
                    <div className="col-md-3 g-4 " key={res.id}>
                        <div className="card h-100 text-center p-4 border-2 shadow-sm" >
                            <img src={res.image} className="card-img-top" height={250} alt={res.title} />
                            <div className="card-body">
                                <h5 className="card-title mb-0 text-truncate">{res.title}</h5>
                                <p className="card-text lead fw-bold">${res.price}</p>
                                <Link to={`products/${res.id}`} className="btn btn-outline-dark">Buy Now</Link>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export const ShowProduct = ({ product })  => {
    const dispatch = useDispatch()

    const addProductToCart = (product) => {
        dispatch(addItem(product))
    }

    return (
        <>
            <div className="col-md-6 text-center">
                <img src={product.image} alt={product.title} height={400} width={400} />
            </div>
            <div className="col-md-6">
                <h4 className="text-uppercase text-black-50">
                    {product.category}
                </h4>
                <h1 className="display-5">{product.title}</h1>
                <p className="lead fw-bolder">
                    Rating {product.rating && product.rating.rate}
                    <FontAwesomeIcon icon={faStar} />
                </p>
                <h3 className="display-6 fw-bold my-4">
                    ${product.price}
                </h3>
                <p className="lead">${product.description}</p>
                <button onClick={() => addProductToCart(product)} className="btn btn-outline-dark px-4 py-2">
                    Add to Cart
                </button>
                <Link to={"/cart"} className="btn btn-dark ms-2 px-3 py-2">
                    Go to Cart
                </Link>
            </div>
        </>
    )
}

export const getProducts = async () => {
    const response = await fetch("https://fakestoreapi.com/products");
    const results = await response.json();
    return results
}

export const getProduct = async ({params}) => {
    const response = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    const result = await response.json();
    return result
}
