import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";

export const getAllUserChats = async({ limit=20, page=1, ...filters } = {})=>{
	const res = await axiosInstance.get( API_ROUTES.CHAT.GET_ALL({ limit, page, filters }));
	return res.data.data;
}

export const getChatById = async(id) => {
	const res = await axiosInstance.get(API_ROUTES.CHAT.GET(id));
	return res.data.data;
}

export const getOrCreateDirectChat = async(receiptantId) => {
	const res = await axiosInstance.post(API_ROUTES.CHAT.GET_OR_CREATE, {receiptantId});
	return res.data.data;
}

export const getChatMessages = async(chatId, { limit= 30, page= 1, ...filters })=>{

	console.log("Getting Chat messages: ")

	const res = await axiosInstance.get(API_ROUTES.CHAT.GET_MESSAGES(chatId, {limit, page, filters}));

	console.log("Getting Chat messages: ", res.data.data)

	return res.data.data;
}