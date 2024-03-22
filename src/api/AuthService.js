import axios from "axios";

const BASE_URL = "http://10.51.4.59:8000"; // Change this to your API's base URL

const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/sign-in`, {
      email,
      password,
    });
    console.log(response.data);
    if (!!response.data?.data?.accessToken) {
      return response.data.data.accessToken; // Assuming the API responds with a token
    }
    throw new Error("Login failed");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const signup = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/sign-up`, {
      email,
      password,
    });
    console.log(response.data);
    if (!!response.data?.data?.accessToken) {
      return response.data.data.accessToken; // Assuming the API responds with a token
    }
    throw new Error("Signup failed");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const AuthService = {
  login,
  signup,
};
