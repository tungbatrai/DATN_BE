import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const User = React.lazy(() => import("./views/user/user"));
const Product = React.lazy(() => import("./views/product/Product"));
// Base

const routes = [
  { path: "/", exact: true, name: "Dashboard", component: Dashboard },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/user", name: "user", component: User },
  { path: "/product", name: "user", component: Product },
];
export default routes;
