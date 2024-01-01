import axios, { Axios, AxiosError } from "axios";

import { apiInstance } from "./instance";

/*
@ROUTE: /register
*/

export const registerApi = async ({ name, email, phone, password }) => {
  try {
    const response = await apiInstance.post(
      "/register",
      {
        name,
        email,
        phone,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = error?.response?.data?.message;
      throw new Error(errorMsg);
    }
    throw new Error(error.message);
  }
};

/*
@ROUTE: /login
*/

export const loginApi = async ({ email, password }) => {
  try {
    const response = await apiInstance.post(
      "/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = error?.response?.data?.message;
      throw new Error(errorMsg);
    }
    throw new Error(error.message);
  }
};

/*
@ROUTE: /verify user
*/

export const verifyUser = async ({ otp }) => {
  try {
    const response = await apiInstance.put(
      "/verify-user",
      {
        otp,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = error?.response?.data?.message;
      throw new Error(errorMsg);
    }
    throw new Error(error.message);
  }
};

/*
@ROUTE: /resend otp
*/

export const resendOtp = async ({ email }) => {
  try {
    const response = await apiInstance.post(
      "/resend-otp",
      {
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = error?.response?.data?.message;
      throw new Error(errorMsg);
    }
    throw new Error(error.message);
  }
};

/*
@ROUTE: /forgot-password
*/

export const forgotPassword = async ({ email }) => {
  try {
    const response = await apiInstance.post("/forgot-password", {
      email,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = error?.response?.data?.message;
      throw new Error(errorMsg);
    }
    throw new Error(error.message);
  }
};

/*
@ROUTE: /reset-password
*/

export const resetPassword = async ({ password, confirmPassword, token }) => {
  try {
    const response = await apiInstance.put(
      "/reset-password",
      {
        password,
        confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = error?.response?.data?.message;
      throw new Error(errorMsg);
    }
    throw new Error(error.message);
  }
};

/*
@ROUTE: /whoami
*/

export const whoAmi = async ({ token }) => {
  try {
    const response = await apiInstance.get("/whoami", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMsg = error?.response?.data?.message;
      throw new Error(errorMsg);
    }
    throw new Error(error.message);
  }
};
