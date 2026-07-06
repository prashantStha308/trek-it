import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";

export const getAllGuides = async ({ limit = 10, page = 1, ...query }) => {
    const res = await axiosInstance.get(API_ROUTES.GUIDE.GET_ALL({ limit, page, ...query }))
    return res.data.data;
}

export const getGuideById = async (id) => {
    const res = await axiosInstance.get(API_ROUTES.GUIDE.GET(id))
    return res.data.data;
}

export const searchGuides = async (query) => {
    const { name, regions, specialities } = query;
    const res = await axiosInstance.get(API_ROUTES.GUIDE.SEARCH({
        name: name || undefined,
        regions,
        specialities
    }));
    return res.data.data;
}

export const updateGuide = async (id, payload) => {
    const res = await axiosInstance.put(API_ROUTES.GUIDE.UPDATE(id), payload);
    return res.data.data;
}


// export const getAllUsers = async (query) => {
//     const res = await getAllResource("user", query)
//     return res.data;
// }


export const deleteUser = async () => {
    const res = await axiosInstance.delete(API_ROUTES.GUIDE.BASE)
    return res.data;
}