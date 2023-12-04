import bgImg from '../../assets/home/bg.jpg'
import { getProducts } from '../../helper/helper';
import ProductList from './components/ProductList'

export async function loader() {
    const products = await getProducts();
    console.log(products);
    return {products};
}

const Home = () => {
    return (
        <div className="hero">
            <div className="card bg-dark text-white border-0 h-100">
                <img src={bgImg} className="card-img h-100vh" alt="background" />
                <div className="card-img-overlay d-flex flex-column justify-content-center">
                    <div className="container">
                    <h5 className="card-title display-3 fw-bolder mb-0">NEW SEASON ARRIVALS</h5>
                    <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
                    </div>
                </div>
            </div>
            <ProductList />
            
        </div>
    )
}

export default Home
