import { useLoaderData } from "react-router-dom";
import { LoadingProduct, ShowProduct, getProduct } from "../../helper/compHelper";


export async function loader({params}) {
    const product = await getProduct({params});
    return {product};
}

const Product = () => {
    const { product } = useLoaderData();

    return (
        <div className="container py-5">
            <div className="row py-4">
                {!product ? <LoadingProduct/> : <ShowProduct product={product} />}
            </div>
        </div>
    )
}

export default Product
