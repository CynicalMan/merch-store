/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useEffect, useRef, useState } from "react";
import { addProduct, handleFiles } from "../helper/helper";
import React from "react";
import { Link, useFetcher, useNavigate } from "react-router-dom";
import "./UserProfile.css";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import AuthService from "services/AuthService";
export async function addProductAction({ request }) {
  console.log(request);
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "addProductAction") {
    try {
      console.log(values);
      console.log(data.getAll("image"));
      const resp = addProduct({
        title: values.title,
        description: values.description,
        category: values.category,
        price: values.price,
      });
      console.log(resp);
      return resp;
    } catch (e) {
      throw new Error("There was a problem in adding the product " + e);
    }
  }
}



function UserProfile() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const navigate = useNavigate()
  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  const handleFileChange = (e) => {
      const resp = handleFiles({
        files : Array.from(e.target.files)
      })
  }


  return (
    <>
      <div className="content margin-width">
        <Row>
          <Col md="12 ">
            <Card className="">
              <CardHeader>
                <h5 className="title text-center">Add Product</h5>
                { AuthService.isAuthenticated()  && <Link to="http://localhost:5173/signin/" onClick={() => {AuthService.logout();}} className="btn btn-outline-dark ms-2">Logout</Link>}
              </CardHeader>
              <CardBody className="">
                <fetcher.Form method="post" className="grid-sm" ref={formRef}>
                  {" "}
                  <Row className="colgap paddinX">
                    <Col className="px-md-1" md="3">
                      <FormGroup>
                        <label> Title</label>
                        <Input
                          defaultValue=""
                          placeholder="Title-1"
                          type="text"
                          name="title"
                          ref={focusRef}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Category</label>
                        <Input placeholder="Men's collection"  name="category" type="text" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="colgap2 paddinX">
                    <Col className="pl-md-1" md="4">
                      <FormGroup>
                        <label>Price</label>
                        <Input placeholder="200 EGP" 
                         name="price"
                         type="number" />
                      </FormGroup>
                    </Col>
                    <Col className="pl-md-1" md="4">
                      <FormGroup className="paddinY">
                        <label>Image</label>
                        <Input
                          className="w-5"
                          accept="image/png, image/jpeg"
                          id="image"
                          name="image"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="paddinX">
                    <Col md="8">
                      <FormGroup>
                        <label>Description</label>
                        <Input
                          name="description"
                          cols="80"
                          defaultValue=""
                          placeholder="Here can be your description"
                          rows="4"
                          type="textarea"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <input type="hidden" name="_action" value="addProductAction" />
                  <CardFooter className="text-center">
                    <Button className="btn-fill" color="primary" type="submit">
                    {
                      isSubmitting ? <span>Saving...</span> : (<><span>Save</span></>)
                    }
                    </Button>
                  </CardFooter>
                </fetcher.Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserProfile;
