import { Link } from "react-router-dom";
import "./styles/checkout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RoundingNumber } from "../../helper/compHelper";
import { useDispatch } from "react-redux";
import { delItem } from "../../redux/product/productSlice";
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";
import { useRef  } from "react";
import AuthService from "../../services/AuthService";
import { IOrderData, checkoutPost, getOrderLocalStorage } from "../../helper/helper";

export async function checkoutFunction({request}) {
  const data = await request.formData()
  const {_action , ...values} = Object.fromEntries(data);
  console.log(values);
  if(_action == "checkoutAction")
  {
    try 
    {
      const userData = IOrderData()
      const resp = checkoutPost({userData : userData})
      window.alert("Order Placed")
      console.log(resp);
      localStorage.clear()
      window.location.reload()
      return resp
    } catch (error) {
      console.log(error);
    }
  }
}


const Checkout = () => {

  const { value } = useSelector(
    (state) => state.products
  );
    const userID = AuthService.getUserId();  

      const handleDataFromLocal = ()=>{
        const { value } = useSelector(
          (state) => state.products
        );
        const ls = getOrderLocalStorage({ value : value , userID : userID })
        console.log(value);
      }
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
    
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-2 border-bottom">
        <div className="container container-checkout">
          <Link to={"/"} className="fw-semibold fs-3 py-2 px-3 text-decoration-none text-black">Abo3amo Apparel</Link>
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
                        <img src={`http://localhost:4000/uploads/${res.images[0]}`} className="w-100 " alt="" />
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
                <input type="hidden" name="_action" value="checkoutAction" />
              <button type="submit" onClick={handleDataFromLocal()}  className="btn btn-outline-dark" disabled={isSubmitting}>
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
