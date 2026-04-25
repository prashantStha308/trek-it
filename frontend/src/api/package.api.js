import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";

export const getAllPackages = async (query = {}) => {
    const { limit = 10, page = 1, ...filter } = query

    const res = await axiosInstance.get(
        API_ROUTES.PACKAGE.GET_ALL({
            limit,
            page,
            ...filter,
        })
    )

    return res.data.data
}
export const getPackageById = async (id) => {
    const res = await axiosInstance.get(API_ROUTES.PACKAGE.GET(id))
    return res.data;
}

export const updatePackage = async () => {
    const res = await axiosInstance.put(API_ROUTES.PACKAGE.BASE)
    return res.data;
}

export const deletePackage = async () => {
    const res = await axiosInstance.delete(API_ROUTES.PACKAGE.BASE)
}