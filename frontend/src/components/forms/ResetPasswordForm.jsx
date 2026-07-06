import React from "react";

const ResetPasswordForm = () => {
  return (
    <div className="p-2 rounded-md bg-gray-200">
      <form action="">
        <div className="w-full">
          <label htmlFor="newPassword" className="text-lg text-black">
            New password
          </label>
          <input
            name="newPassword"
            id="newPassword"
            className="block w-full h-40 bg-green-300 border-amber-600"
            type="passowrd"
          />
        </div>
        <div className="w-full">
          <label htmlFor="confirmPassword">
            Confirm Password shjkhajskfh asdjhf
          </label>
          <input
            name="confirmPassword"
            id="confirmPassword"
            className="block w-full h-60 bg-green-300 border-amber-600"
            type="password"
          />
        </div>
        <div>
          <button className="w-full">Update Password</button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
