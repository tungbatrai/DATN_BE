/** @format */

import Login from "./component/Login/Login";
import ForgotPassword from "./component/Login/ForgotPassword";
import ResetPassword from "./component/Login/ResetPassword";
import AdminList from "./component/AdminManager/AdminList";
import AdminRegister from "./component/AdminManager/AdminRegister";
import AdminOrderDetail from "./component/AdminOrders/AdminOrderDetail";
import AdminOrdersWaitting from "./component/AdminOrders/AdminOrdersWaitting";
import AdminOrderConfirm from "./component/AdminOrders/AdminOrderConfirm";
import AdminOrderPaid from "./component/AdminOrders/AdminOrderPaid";
import AdminOrderShipping from "./component/AdminOrders/AdminOrderShipping";
import AdminOrdersCompleted from "./component/AdminOrders/AdminOrdersCompleted";
import ProductManager from "./component/ProductManager/ProductManager";
import ProductRegisterDetail from "./component/ProductManager/ProductRegisterDetail";
import ProductTypeManager from "./component/ProductManager/PrductTypeManage";
import CategoryManager from "./component/Category/CategoryManager";
import RatingManager from "./component/Rating/RatingManager";
import Comment from "./component/Comment/Comment";
import Banner from "./component/Banner/Banner";
import AdminReport from "./component/AdminReport/AdminReport";
export const routes = [
  { path: "/login", exact: false, component: Login },
  // { path: "/password/forgot", exact: true, component: ForgotPassword },
  { path: "/password/reset", exact: true, component: ResetPassword },

  { path: "/index.html", exact: false, component: AdminList },
  { path: "/", exact: true, component: AdminList },

  { path: "/admin", exact: true, component: AdminList },
  { path: "/admin/register", exact: true, component: AdminRegister },
  { path: "/admin/edit/:id", exact: true, component: AdminRegister },

  { path: "/orders-waitting", exact: true, component: AdminOrdersWaitting },
  { path: "/orders-confirm", exact: true, component: AdminOrderConfirm },
  { path: "/orders-paid", exact: true, component: AdminOrderPaid },
  { path: "/orders-shipping", exact: true, component: AdminOrderShipping },
  { path: "/orders-completed", exact: true, component: AdminOrdersCompleted },
  { path: "/orders/edit/:id", exact: true, component: AdminOrderDetail },

  { path: "/product", exact: true, component: ProductManager },
  { path: "/product/category", exact: true, component: CategoryManager },
  { path: "/product/product", exact: true, component: ProductManager },
  { path: "/product/banner", exact: true, component: Banner },
  {
    path: "/product/product/edit/:id",
    exact: true,
    component: ProductRegisterDetail,
  },
  {
    path: "/product/product/register",
    exact: true,
    component: ProductRegisterDetail,
  },
  {
    path: "/product/product/product-type/:id",
    exact: true,
    component: ProductTypeManager,
  },

  { path: "/rating", exact: true, component: RatingManager },
  { path: "/comment", exact: true, component: Comment },
  { path: "/admin-report", exact: true, component: AdminReport },
];

export const navigation = [
  {
    mainMenu: "admin-report",
    url: "/admin-report",
  },
  {
    mainMenu: "User - Admin ",
    url: "/admin",
  },
  {
    mainMenu: "Orders",
    subMenu: [
      { name: "Orders waitting", url: "/orders-waitting" },  
      { name: "Orders confirm", url: "/orders-confirm" },
      { name: "Orders paid", url: "/orders-paid" },
      { name: "Orders shipping", url: "/orders-shipping" },
      { name: "Orders completed", url: "/orders-completed" },
    ],
  },
  {
    mainMenu: "List- Item",
    subMenu: [
      { name: "Category", url: "/product/category" },
      { name: "Product", url: "/product/product" },
      { name: "Banner", url: "/product/banner" },
    ],
  },
  {
    mainMenu: "Comment",
    url: "/comment",
  },
  {
    mainMenu: "Rating",
    url: "/rating",
  },
];

export default routes;
