import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";

export const getAllUserChats = async({ limit=20, page=1, ...filters } = {})=>{
	const res = await axiosInstance.get( API_ROUTES.CHAT.GET_ALL({ limit, page, filters }));
	return res.data.data.docs;
}

export const getChatById = async(id) => {
	const res = await axiosInstance.get(API_ROUTES.CHAT.GET(id));
	return res.data.data;
}