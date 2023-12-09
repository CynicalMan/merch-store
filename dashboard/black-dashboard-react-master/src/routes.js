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
import TableList from "views/TableList.js";
import { addProductAction } from "views/UserProfile";
import UserProfile from "views/UserProfile.js";

var routes = [
  {
    path: "/user-profile",
    name: "Adding Product",
    rtlName: "اضافه منتج",
    icon: "tim-icons icon-single-02",
    component: <UserProfile />,
    layout: "/admin",
    action: addProductAction
  },
  {
    path: "/tables",
    name: "Users / Orders",
    rtlName: "قائمة الطلبات و المستخدمين",
    icon: "tim-icons icon-puzzle-10",
    component: <TableList />,
    layout: "/admin",
    action: getOrdersAction,
  },
];
export default routes;
