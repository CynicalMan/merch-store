import bgImg from '../../assets/home/bg.jpg'
import { getProducts } from '../../helper/compHelper';
import ProductList from '../../components/ProductList'
import { useLoaderData } from 'react-router-dom';

export async function loader() {
    const products = await getProducts();
    console.log(products);
    return { products };
}

const Home = () => {

    const {products} = useLoaderData()

    return (
        <div className="hero">
            <div className="card bg-dark text-white border-0 h-100">
                <img src={bgImg} className="card-img h-100vh object-fit-cover" alt="background" />
                <div className="card-img-overlay d-flex flex-column justify-content-center">
                    <div className="container">
                        <h5 className="card-title display-3 fw-bolder mb-0">NEW SEASON ARRIVALS</h5>
                        <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
                    </div>
                </div>
            </div>
            <ProductList products={products} />
        </div>
    )
}

export default Home
