import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Bgimg from "../../assets/Sign/470x800.png"
import { Link, useFetcher } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Auth } from "../../helper/helper";

export async function signinAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  
  if (_action === "signinAction") {
    try {
      console.log(values);
      const resp = Auth({
        email: values.email,
        password: values.password
      })
      console.log(resp);
    }
    catch (e) {
      throw new Error("There was a problem in sign up " + e);
    }
  }
}
const Signin = () => {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef()
  const focusRef = useRef()

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset()
      focusRef.current.focus()
    }
  }, [isSubmitting]);

  return (
    <div className=" h-100vh w-75 m-auto mt-5 ">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row shadow-lg mb-5 bg-white rounded text-center">
          <main className="form-signin d-flex justify-content-center align-items-around p-0  bg-white w-100 rounded-1">
            <div className="col-md-6 text-bg-danger h-100 overflow-hidden">
              <img src={Bgimg} className="h-100 w-100 cover" alt="img" />
            </div>
            <div className="col-md-6 text-bg-light d-flex justify-content-center align-items-center bg-white">
              <div className="d-flex justify-content-center align-items-center bg-white">
                <fetcher.Form
                  method="post"
                  className="grid-sm"
                  ref={formRef}
                >
                  <h1 className="mb-3">Login</h1>
                  <div className="d-flex mb-3">
                    <label htmlFor="emailId" className="d-flex align-items-end px-2"><FontAwesomeIcon icon={faCircleUser}  /></label>
                    <input
                      type="email"
                      className="underline-input mt-1 "
                      id="emailId"
                      name="email"
                      required
                      placeholder="email"
                      ref={focusRef}
                    />
                  </div>
                  <div className="d-flex mb-3">
                    <label htmlFor="passwordId" className="d-flex align-items-end px-2"><FontAwesomeIcon icon={faLock} /></label>
                    <input
                      type="password"
                      className="underline-input mt-1 "
                      id="passwordId"
                      name="password"
                      required
                      placeholder="password"
                    />
                  </div>
                  <input type="hidden" name="_action" value="signinAction" />
                  <button type="submit" className="btn btn-outline-dark" disabled={isSubmitting}>
                    {
                      isSubmitting ? <span>Logging in...</span> : (<><span>Log in</span></>)
                    }
                  </button>
                </fetcher.Form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Signin;