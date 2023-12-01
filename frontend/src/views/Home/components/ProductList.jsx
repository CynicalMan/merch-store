import { useState, useEffect } from "react";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState({
    loading: false,
    results: [],
    err: null,
  });

  useEffect(() => {
    setProducts({ ...products, loading: true });
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res);
        setProducts({
          ...products,
          results: res.data,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        console.log(err);
        setProducts({
          ...products,
          err: "something went wrong : " + err,
          loading: false,
        });
      });
  }, []);

  return (
    <>
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-12 display-6 fw-bolder text-center mb-5">
            <h1>Latest Products</h1>
          </div>
        </div>
        <div className="row d-flex justify-content-around align-items-center">
          {products.results.map((prod) => {
            return (
              <div className="col-md-4 col-sm-6 d-flex justify-content-center py-3">
                <div className="card" style={{ width: "18rem" }}>
                  <div className=" w-75 m-auto">
                    <img
                    src={prod.image}
                    className="card-img-top img-fluid img-thumbnail px-2"
                    alt="..."
                    style={{width:"200px" , height:"150px"}}
                  />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title text-truncate pointer1">{prod.title}</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProductList;
