import React from "react";
import { useState, useEffect } from "react";
import { resetPassword } from "../../services/authService";

const ResetPasswordForm = ({ token }) => {
  const [changePasswordForm, setChangePasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangePasswordForm({
      ...changePasswordForm,
      [name]: value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await resetPassword(
        token,
        changePasswordForm.newPassword,
        changePasswordForm.confirmPassword,
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full p-6 rounded-md bg-gray-100">
      <div className="text-2xl text-center"> Reset Password</div>
      <p className="mb-6 text-sm text-center text-gray-600">
        Fill up the form to reset the password
      </p>
      <form onSubmit={submitForm}>
        <div className="w-full mb-4">
          <label htmlFor="newPassword" className="text-slate-700 mb-2">
            New Password
          </label>
          <input
            name="newPassword"
            id="newPassword"
            className="block w-full border-2 border-slate-400 h-10 rounded-md px-3 focus:outline-slate-600"
            type="password"
            value={changePasswordForm.newPassword}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="w-full mb-6">
          <label htmlFor="confirmPassword" className="text-slate-700 mb-2">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            id="confirmPassword"
            className="block w-full border-2 border-slate-500 h-10 rounded-md px-3 focus:outline-slate-600"
            type="password"
            value={changePasswordForm.confirmPassword}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full h-10 rounded-md bg-slate-500 text-white cursor-pointer hover:bg-slate-600 active:bg-slate-500"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
