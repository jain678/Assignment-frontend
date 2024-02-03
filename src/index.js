import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Startup from "./modules/startup/startup";
import Investor from "./modules/investor/investor";
import Header from "./components/UI/Header";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
  },
  {
    path: "/logout",
    element: <Header />,
  },
  {
    path: "/startup/:startupId",
    element: <Startup />,
  },
  {
    path: "/investor",
    element: <Investor />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
