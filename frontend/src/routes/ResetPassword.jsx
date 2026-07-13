import React from "react";
import { useParams } from "react-router-dom";
import ResetPasswordForm from "../components/forms/ResetPasswordForm";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const { productId } = useParams();
  const location = useLocation();
  const token = location.pathname.split("/")[2];
  return (
    <div className="h-screen w-screen">
      <div className="h-full w-1/3 mx-auto  flex justify-center items-center">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}

export default ResetPassword;
