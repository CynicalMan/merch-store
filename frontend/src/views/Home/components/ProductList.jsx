import { useState, useEffect } from "react"
import axios from "axios"

const ProductList = () => {

    const [products, setProducts] = useState({
        loading: false,
        results: [],
        err: null,
    });

    useEffect(() => {
        setProducts({ ...products, loading: true })
        axios
            .get("https://fakestoreapi.com/products")
            .then((res) => {
                console.log(res);
                setProducts({ ...products, results: res.data, loading: false, err: null });
                const product = res.data[0]
                console.log(product);
            })
            .catch((err) => {
                console.log(err);
                setProducts({ ...products, err: "something went wrong : " + err, loading: false });
            });

    }, []);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>
                            Latest Products
                        </h1>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductList
