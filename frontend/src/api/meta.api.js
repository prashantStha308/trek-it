import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";

const getMetalWrapper = async ( field, query )=>{
	const res = await axiosInstance.get( API_ROUTES.META[field.toUpperCase()](query) );

	return res.data.data;
}

export const getRegions = async (query)=> await getMetalWrapper("REGIONS", query);
export const getActivities = async (query)=> await getMetalWrapper("ACTIVITIES", query);
export const getSpecialities = async (query)=> await getMetalWrapper("SPECIALITIES", query);
