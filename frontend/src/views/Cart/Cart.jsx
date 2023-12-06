import { useState } from "react";
import "./Cart.css";
import { ShowCart } from "../../helper/compHelper";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { openCartBar } from "../../redux/cart/cartSlice";

const Cart = () => {


  const dispatch = useDispatch();
  const { value, totalQuantity, totalAmount } = useSelector((state) => state.products)
  const cart = useSelector((state) => state.cartState.value)
  console.log(value);


  return (
    <>

      <div
        className={`offcanvas offcanvas-start ${cart ? `show` : ``} shadow-lg `}
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
            onClick={() => { dispatch(openCartBar(false)) }}
          ></button>
        </div>
        <div className="offcanvas-body">
          <ShowCart result={value}/>
        </div>
      </div>
      {cart && <div className="modal-backdrop fade show" onClick={() => { dispatch(openCartBar(false)) }}></div>}
    </>
  );
};

export default Cart;
