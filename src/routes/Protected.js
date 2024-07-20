import React from "react";
import useUserStore from "../utils/userStore";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const { currentUser } = useUserStore();

  if (!currentUser) return <Navigate to="/login" replace />;
  else {
    return children;
  }
}

export default Protected;
