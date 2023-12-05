import { useState } from "react";
import "./Cart.css";
import { ShowCart, ShowProducts, getProducts } from "../../helper/compHelper";
import { useLoaderData } from "react-router-dom";
import { useSelector } from 'react-redux'

const Cart = () => {
  const [openCart, setOpenCart] = useState(false);

  const { cartItems } = useLoaderData();
  console.log(cartItems);

  return (
    <>
      <button
        className="btn btn-primary"
        type="button"
        onClick={()=>{setOpenCart(true)}}
      >
        toggle
      </button>

      <div
        className={`offcanvas offcanvas-start show shadow-lg `}
        tabIndex="-1"
        id="offcanvasWithBackdrop"
        aria-labelledby="offcanvasWithBackdropLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-center" id="offcanvasWithBackdropLabel">
          Cart
        </h5>
          <button
            type="button"
            className="btn-close text-reset"
            onClick={()=>{setOpenCart(false)}}
          ></button>
        </div>
        <div className="offcanvas-body">
          <ShowCart cartItems={cartItems}/>
        {/* {!cart?<div className="text-center">Cart is empty</div>:<ShowCart result={cart}/>} */}
        </div>
      </div>
       {openCart && <div className="modal-backdrop fade show" onClick={()=>{setOpenCart(false)}}></div>}
    </>
  );
};

export default Cart;
