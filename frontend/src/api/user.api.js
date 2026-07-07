import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";

    // USER: {
    //     GET_ALL: (query) => resolveRoute('/user', null, query),
    //     GET: (id) => resolveRoute('/user', id),
    //     ME: "/user/me",
    //     BASE: "/user"
	// },


export const updateMe = async(body) => {
	const res = await axiosInstance.patch(API_ROUTES.USER.BASE, body);

	return res.data.data;
}