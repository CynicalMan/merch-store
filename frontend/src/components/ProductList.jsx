import { LoadingProducts, ShowProducts } from "../helper/compHelper";
import { useLoaderData } from "react-router-dom";

const ProductList = ({ products }) => {

    return (
        <>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">
                            Latest Products
                        </h1>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content">
                    {!products ? <LoadingProducts /> : <ShowProducts results={products} />}
                </div>
            </div>
        </>
    )
}


export default ProductList;
