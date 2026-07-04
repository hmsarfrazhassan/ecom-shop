import React from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const { productId } = useParams();
  return <div>Reset Password {productId}</div>;
}

export default ResetPassword;
