import { Link } from "react-router-dom";
import "./styles/checkout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RoundingNumber } from "../../helper/compHelper";
import { useDispatch } from "react-redux";
import { delItem } from "../../redux/product/productSlice";
import {checkoutPost} from "../../helper/helper"
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";
import { useRef  } from "react";
import AuthService from "../../services/AuthService";

export async function checkoutAction(values, userID) {
  console.log(values)
  try {
    const products = [];
    values.forEach((res) => {
      products.push({ productId : res._id , quantity : res.qty });
    });
    console.log(products);
    const userData = {
      "userID": userID,
      "products": products,
    };
    console.log(userData);
    const resp = await checkoutPost({ userData }); // Assuming checkoutPost is an async function
    console.log(resp);
    return resp;
  } catch (e) {
    console.error("Error in placing order:", e);
    throw new Error(e);
  }
}

const Checkout = () => {
    const userID = AuthService.getUserId();  
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === "submitting"
    const formRef = useRef()
    useEffect(() => {
      if (!isSubmitting) {
        formRef.current.reset()
      }
    }, [isSubmitting]);


    const dispatch = useDispatch();
    const delProductToCart = (prodId) => {
      dispatch(delItem(prodId));
    };
  const { value, totalQuantity, totalAmount } = useSelector(
    (state) => state.products
  );
  console.log(value);
  if (!Array.isArray(value)) {
    console.error("Invalid 'value'. It should be an array.");
    // You might want to handle this case appropriately, e.g., show an error message.
    return null;
  }

  console.log(value);
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-2 border-bottom">
        <div className="container container-checkout">
          <Link to={"/"} className="fw-semibold fs-3 py-2 px-3">Abo3amo Apparel</Link>
          <div className="btn btn-outline border-0">
            <FontAwesomeIcon className="" width={24} icon={faBagShopping} />
          </div>
        </div>
      </nav>

      <div className="container container-checkout py-5">
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              {value?.map((res) => {
                return (
                  <li className="list-group-item d-flex justify-content-between lh-condensed" key={res._id}>
                    <div className="row rounded-3 d-flex h-50 p-2 border-bottom-1 shadow-sm w-100">
                      <div className="col-4 ">
                        <img src={res.image} className="w-100 " alt="" />
                      </div>
                      <div className="col-8  ">
                        <div className="text-truncate">Title: {res.title}</div>
                        <div>
                          SubTotal: {RoundingNumber(res.price * res.qty)} EGP
                        </div>
                        <div className="d-flex justify-content-between pt-1">
                          <div className="col-3 w-50 mt-2">Qty: {res.qty} </div>
                          <div className="col-8 w-50">
                            {" "}
                            <button
                              onClick={() => delProductToCart(res._id)}
                              className="btn btn-dark btn-sm mt-1 "
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <fetcher.Form className="needs-validation"
            method="post"
            ref={formRef}
            noValidate="">
              <h4 className="mb-3">Payment</h4>

              <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    checked=""
                    required
                    disabled
                  />
                  <label className="custom-control-label" htmlFor="credit">
                    Credit card
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    required=""
                    disabled
                  />
                  <label className="custom-control-label" htmlFor="debit">
                    Debit card
                  </label>
                </div>
                <div className="custom-control custom-radio">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    required=""
                  />
                  <label className="custom-control-label" htmlFor="paypal">
                    Cash on Delivery
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-name">Name on card</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-name"
                    placeholder=""
                    disabled
                  />
                  <small className="text-muted">
                    Full name as displayed on card
                  </small>
                  <div className="invalid-feedback">
                    Name on card is required
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cc-number">Credit card number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-number"
                    placeholder=""
                    disabled
                  />
                  <div className="invalid-feedback">
                    Credit card number is required
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">Expiration</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-expiration"
                    placeholder=""
                    disabled
                  />
                  <div className="invalid-feedback">
                    Expiration date required
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="cc-expiration">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cc-cvv"
                    placeholder=""
                    disabled
                  />
                  <div className="invalid-feedback">Security code required</div>
                </div>
              </div>
              <hr className="mb-4" />
              <div className="row text-center">
              <input type="hidden" name="_action" value="checkoutAction"  />
              <button type="submit" onClick={()=>{checkoutAction(value,userID)}} className="btn btn-outline-dark" disabled={isSubmitting}>
                    {
                      isSubmitting ? <span>Placing order...</span> : (<><span>Place order</span></>)
                    }
                  </button>
              </div>
            </fetcher.Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
