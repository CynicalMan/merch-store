import { useState } from "react";
import "./Cart.css";
import { ShowCart } from "../../helper/compHelper";
import { useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
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
        className={`offcanvas offcanvas-start shadow-lg ${openCart?`show`:``} `}
        tabIndex="-1"
        id="offcanvasWithBackdrop"
        aria-labelledby="offcanvasWithBackdropLabel"
      >
        <div className="offcanvas-header">
        <FontAwesomeIcon icon={faCartShopping} className="fa-lg" />
          <h5 className="offcanvas-title text-center " id="offcanvasWithBackdropLabel">
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
        </div>
      </div>
       {openCart && <div className="modal-backdrop fade " onClick={()=>{setOpenCart(false)}}></div>}
    </>
  );
};

export default Cart;
