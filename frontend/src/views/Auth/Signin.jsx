import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser , faLock } from "@fortawesome/free-solid-svg-icons";
import Bgimg from "../../assets/Sign/470x800.png"
import { useFetcher } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Auth } from "../../helper/helper";


export async function signinAction({request}){
  const data = await request.formData();
  const {_action , ...values} = Object.fromEntries(data);

  if(_action === "signinAction" ){
    try{
      Auth({
        email:values.email,
        password:values.password
      })
    }
    catch(e){
      throw new Error("There was a problem in sign up " + e);
    }
  }
}
const Signin = () => {
  

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
         <form method= "get" ref={formRef}>
            <h1>Login</h1>
            <div className="form-floating mb-3 px-3">
              <input 
              type="email"
              className="underline-input mt-1 "
              id="usernameId" 
              name="email"
              required
              ref={focusRef}
              placeholder=""
              />
              <label htmlFor="usernameId" className=""><FontAwesomeIcon icon={faCircleUser} /></label>
            </div>
            <div className="form-floating mb-3 ">
              <input 
              type="password"
              className="underline-input mt-1 "
              id="passwordId" 
              name="password"
              required
              placeholder=""
              />
              <label htmlFor="passwordId" className=""><FontAwesomeIcon icon={faLock} /></label>
            </div>
            <input type="hidden" name="_action" value="signinAction" />
            <button 
            type="submit"
            className="w-75 btn btn-sm btn-dark mt-5 py-2 m-auto ">
              Sign in
            </button>
            <p className="text-muted">Doesn't have an account ? <a className= "link-offset-2 link-underline link-underline-opacity-0" href="">Sign up.</a></p>
         </form>
         </div>
         </div>
        </main>
      </div>
      </div>
    </div>
  );
};

export default Signin;