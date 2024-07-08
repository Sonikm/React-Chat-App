import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Notification() {
  return <ToastContainer autoClose={2000} />;
}

export default Notification;
