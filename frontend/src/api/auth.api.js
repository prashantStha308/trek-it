import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";
import {showToast} from "@/store/ui.store";


export const login = async (data) => {
  try{
      const res = await axiosInstance.post(API_ROUTES.AUTH.LOGIN, data);

      showToast({message: res.data.message, title: "Login Successfull"});
      return res.data;
  
  }catch(err){
    showToast({message: err?.response.message || "Login failed", title: "Login Failed"});
    
    console.log(err);

    return err;
  }
};

export const logout = async () => {
  try{
    const res = await axiosInstance.post(API_ROUTES.AUTH.LOGOUT);

    showToast({ message: res.data.message , title: "Logged out Successfully" });

    return res.data;

  }catch(err){
    showToast({ message: err?.response.message , title: "Failed to Logout" });
    
    console.log(err);

    return err;
  }
};

export const getMe = async () => {
  try{
    const res = await axiosInstance.get(API_ROUTES.USER.ME);
    return res.data.data;

  }catch(err){
    showToast({message: err?.response.message, title: "Failed to Get User Data"})
    
    console.log(err);

    return err;
  }
};

export const registerGuide = async (data) => {
  const res = await axiosInstance.post(API_ROUTES.AUTH.REGISTER_GUIDE, data);
  return res;
}

export const registerTourist = async (data) => {
  const res = await axiosInstance.post(API_ROUTES.AUTH.REGISTER_TOURIST, data);
  return res;
}

export const register = async (data, role="tourist") => {
  try{
    const res = role.toLowerCase() === "tourist" ? await registerTourist(data) : await registerGuide(data);
    
    showToast({message: res.data.message , title: "Registration Successful" });
    return res.data.data;
  
  }catch(err){
    showToast({message: err?.response.message , title: "Failed to Register user" });
    
    console.log(err);

    return err;
  }
}