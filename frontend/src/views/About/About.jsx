import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import Omar from "../../assets/About/Omar.jpeg";
const About = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row animate rounded-3 animate-text">
          <div className="text-center w-50 m-auto py-5">
            <FontAwesomeIcon icon={faUsers} className="fs-2 " />
            <h2 >About me</h2>
            </div>
            </div>
            <div className="row">
              <h4 className="text-center p-5">Our Team</h4>
            <div className="d-flex justify-content-evenly align-items-center">
              <div className="text-center ">
                <div className="d-flex justify-content-center">
                <div className="rounded-circle overflow-hidden w-25">
                  <img src={Omar} className="w-100 cover" alt="pic" />
                </div>
                </div>
                <h6>Omar khaled</h6>
                <h6 className="text-muted">Frontend Developer</h6>
                
              </div>
              <div className="text-center ">
                <div className="d-flex justify-content-center">
                <div className="rounded-circle overflow-hidden w-25">
                  <img src={Omar} className="w-100 cover" alt="pic" />
                </div>
                </div>
                <h6>Omar khaled</h6>
                <h6 className="text-muted">Frontend Developer</h6>
                
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default About;
