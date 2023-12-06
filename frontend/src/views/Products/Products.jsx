import { useLoaderData } from "react-router-dom";
import ProductList from "../../components/ProductList"
import { getProducts } from "../../helper/compHelper";

export async function loader() {
    const products = await getProducts();
    console.log(products);
    return { products };
}


const Products = () => {
    const {products} = useLoaderData()

    return (
        <>
            <ProductList products={products} />
        </>
    )
}

export default Products
