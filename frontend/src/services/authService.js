import axios from "axios";
export const resetPassword = async (token, password, confirmPassword) => {
  try {
    const response = await axios.put(
      `http://localhost:5555/api/v1/auth/reset-password/${token}`,
      {
        password,
        confirmPassword,
      },
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
