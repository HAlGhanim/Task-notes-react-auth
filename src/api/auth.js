import jwt_Decode from "jwt-decode";
import instance from "../api";

const login = async (userInfo) => {
  try {
    const { data } = await instance.post("/auth/login", userInfo);
    storeToken(data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

const register = async (userInfo) => {
  try {
    console.log(userInfo);
    const formData = new FormData();
    for (const key in userInfo) formData.append(key, userInfo[key]);
    const { data } = await instance.post("/auth/register", formData);
    storeToken(data.token);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const me = async () => {
  try {
    const { data } = await instance.get("/auth/me");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  try {
    const { data } = await instance.get("/auth/users");
    return data;
  } catch (error) {
    console.log(error);
  }
};

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const checkToken = (token) => {
  localStorage.getItem("token");

  if (token) {
    const decode = jwt_Decode(token);
    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  }
  return false;
};

const logout = () => {
  localStorage.removeItem("token");
};
export { login, register, me, getAllUsers, storeToken, checkToken, logout };
