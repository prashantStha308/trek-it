import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";


export const getAllResource = async (field = "user", query = {}) => {
    field = field.toUpperCase();
    const { limit = 10, page = 1, ...filter } = query

    const res = await axiosInstance.get(
        API_ROUTES[field].GET_ALL({
            limit,
            page,
            ...filter,
        })
    )

    return res.data.data
}

// export const getResourceById = async (id, field = "user") => {
//     const res = await axiosInstance.get(API_ROUTES[field.toUpperCase()].GET(id))
//     return res.data;
// }

// export const updateResource = async (field = "user") => {
//     const res = await axiosInstance.put(API_ROUTES[field.toUpperCase()].BASE)
//     return res.data;
// }

// export const deleteResource = async (field = "user") => {
//     const res = await axiosInstance.delete(API_ROUTES[field.toUpperCase()].BASE)
// }