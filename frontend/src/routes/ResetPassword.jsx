import React from "react";
import { useParams } from "react-router-dom";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";

function ResetPassword() {
  const { productId } = useParams();
  return (
    <div>
      <ResetPasswordForm />
    </div>
  );
}

export default ResetPassword;
