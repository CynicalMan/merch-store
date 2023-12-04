import { useState } from "react";
import "./Cart.css";
const Cart = () => {

  const [openCart,setOpenCart] = useState(false)

  

  return (
    <>
      <button className="btn btn-primary" onClick={() => {setOpenCart(true)}}>
        Toggle Cart
      </button>

      <div className={`sidecart ${ openCart ? `open-cart` : ''} bg-dark text-center`}>
        <ul className="nav flex-column">
        <button className="btn btn-light" onClick={() => {setOpenCart(false)}}>close</button>
          <div className="text-light h4 m-0 px-4 text-center">
            Cart
            <div className="d-inline" >
              <i className="far text-success float-right fa-arrow-alt-circle-right mt-1" ></i>
            </div>
          </div>
          <li className="nav-link d-flex flex-wrap flex-row">
            
            <div className="col-12 text-light h5 text-center p-0">
              Item
            </div>
            <div className="row">
            <div className="col-4 p-0">
              <img
                className="img-fluid"
                src="https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-1_large.png?v=1530129292"
                alt=""
              />
            </div>
            <div className="col-2 bg-primary text-light justify-content-around d-flex flex-column">
              <i className="fas fa-plus"></i>
              <div className="product-quantity m-0 p-0 h5">2</div>
              <i className="fas fa-minus"></i>
            </div>
            <div className="sidecart-price pl-0 col-6 bg-primary text-right d-flex flex-wrap text-light">
              <div className="text-right text-dark d-flex flex-row justify-content-end align-items-center h6 m-0 p-0">
                Remover{" "}
                <span className="h5 ml-2 m-0 p-0 ">
                  <b>X</b>
                </span>
              </div>
              <div className="product-price">R$ 1200,00</div>
              <div className="">
                <span className="text-dark">
                  <b>Total</b>
                </span>{" "}
                <span className="product-price-total">R$ 2400,00</span>
              </div>
            </div>
            </div>
          </li>

        </ul>
        <div className="text-light h6 text-left mx-3">
          Total Products:{" "}
          <span className="text-success" id="sidecart-total-products">
            7.200,00 EGP
          </span>
        </div>
        <div className="text-light h6 text-left mx-3">
          Tax:{" "}
          <span className="text-success" id="sidecart-frete">
            EGP 20,00
          </span>{" "}
          (taxa fixa)
        </div>
        <div className="text-light h5 text-left mx-3">
          Cost:{" "}
          <span className="text-success" id="sidecart-total">
             7.220,00 EGP
          </span>
        </div>
        <div className="p-2">
          <button type="button" className="btn btn-success w-100">
            Finalizar Compra
          </button>
            
        </div>
      </div>
    </>
  );
};

export default Cart;
