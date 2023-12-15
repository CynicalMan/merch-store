import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faLock } from "@fortawesome/free-solid-svg-icons";
import Bgimg from "../../assets/Sign/470x800.png"
import { Link, redirect, useFetcher, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Auth } from "../../helper/helper";
import AuthService from "../../services/AuthService";

export async function signinAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "signinAction") {
    try {
      console.log(values);

      // Assuming Auth is an asynchronous function that returns a promise
      const res = await Auth({
        email: values.email,
        password: values.password
      });

      // Handle the response from Auth
      const authToken = res.data.accessToken;
      const userID = res.data.userID;
      console.log(res);

      // Call AuthService to set the login status and store tokens
      AuthService.login({ authToken, userID });

      // Redirect only after successful authentication
      if (res.data.role === "admin"){
        return redirect("http://localhost:3000/admin/dashboard/")
      }else{return redirect("/")}
    } catch (error) {
      window.alert("Error in sign-in:", error);
      return null
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
                  <p className="text-muted">Doesn't have an account ? <Link to = {"/signup"} className= "link-offset-2 link-underline link-underline-opacity-0">Sign up.</Link></p>
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