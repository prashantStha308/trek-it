import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";


export const getAllNotifications = async ({ limit=20, page=1, ...filters } = {})=>{	
	const res = await axiosInstance.get(API_ROUTES.NOTIFICATION.GET_ALL({limit, page, filters}));

	return res.data.data;
}