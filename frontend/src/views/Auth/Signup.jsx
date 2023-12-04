import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser , faLock } from "@fortawesome/free-solid-svg-icons";
import Bgimg from "../../assets/Sign/470x800.png"
import React, { useEffect } from "react";
import { useRef  } from "react";
import {useFetcher} from "react-router-dom";
import { Signup } from "../../helper/helper";

export async function signupAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

    
  if (_action === "signupAction") {
      try {
        Signup({
          email: values.email,
          password: values.password,

        })
      } catch (e) {
          throw new Error("There was a problem in sign up " + e);
      }
  }
}


const Signup = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef()
  const focusRef = useRef()


  useEffect(()=>{
    if(!isSubmitting){
      formRef.current.reset();
      focusRef.current.focus();
    }
  },[isSubmitting]);
  
  return (
    <div className="h-100vh w-75 m-auto mt-5">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row shadow-lg mb-5 bg-white rounded text-center">
          <main className="form-signin d-flex justify-content-center align-items-around p-0 bg-white w-100 rounded-1">
            <div className="col-md-6 text-bg-light d-flex justify-content-center align-items-center bg-white">
              <div className="d-flex justify-content-center align-items-center bg-white">
                <fetcher.Form method="post"  className="p-4" ref = {formRef} >
                  {/* Action  */}
                  <h1 className="py-3">Sign up</h1>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="underline-input mt-1"
                      id="usernameId"
                      name= "email"
                      required
                      placeholder="Email"
                      ref = {focusRef}
                    />  
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="underline-input mt-1"
                      id="passwordId"
                      name= "password"
                      required
                      ref={(ref)=> (formData.current["password"] = ref)}
                      placeholder="Password"
                    />                
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="underline-input mt-1"
                      id="nameId"
                      name= "name"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="tel"
                      className="underline-input mt-1"
                      id="phoneId"
                      name= "phone"
                      placeholder="Phone"
                    />
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="underline-input mt-1"
                      id="addressId"
                      name= "address"
                      placeholder="Address"
                    />
                  </div>
                  <input type="hidden" name="_action" value="signupAction"  />
                  <button
                    type="submit"
                    className="w-75 btn btn-sm btn-dark mt-5 py-2 mx-auto"
                    disabled={isSubmitting}
                  >
                    Sign up
                  </button>
                  <p className="text-muted">
                    Have an account?{" "}
                    <a
                      className="link-offset-2 link-underline link-underline-opacity-0"
                      href=""
                    >
                      Sign in.
                    </a>
                  </p>
                </fetcher.Form>
              </div>
            </div>
            <div className="col-md-6 h-100 overflow-hidden">
              <img
                src={Bgimg}
                className="h-657.71 w-100 cover"
                alt="img"
                style={{ maxWidth: "657.71px" }}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Signup;
