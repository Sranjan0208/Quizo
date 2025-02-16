import axios from "axios";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post("https://quizo-i2pr.onrender.com/login", {
      username,
      password,
    });

    if (response.data.success) {
      sessionStorage.setItem("userId", response.data.userId);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

export const logout = () => {
  sessionStorage.removeItem("userId");
};

export const isAuthenticated = () => {
  return !!sessionStorage.getItem("userId");
};
