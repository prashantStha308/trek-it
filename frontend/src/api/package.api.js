import axiosInstance from "../config/axios.config.js";
import API_ROUTES from "./routes.js";

export const createPackage = async (body) => {
    const formData = new FormData();

    formData.append("name", body.name);
    formData.append("description", body.description);
    formData.append("pricePerPerson", body.pricePerPerson);
    formData.append("minGroupSize", body.minGroupSize);
    formData.append("maxGroupSize", body.maxGroupSize);
    formData.append("daysAlloted", body.daysAlloted);
    formData.append("requiresPermit", body.requiresPermit);
    formData.append("permitDetails", body.permitDetails);

    // Handle arrays
    formData.append("keywords", JSON.stringify(body.keywords));
    formData.append("activities", JSON.stringify(body.activities));
    formData.append("stops", JSON.stringify(body.stops));

    formData.append("thumbnail", body.thumbnail);
    body.images.forEach((image) => {
        formData.append("images", image);
    });

    const res = await axiosInstance.post(API_ROUTES.PACKAGE.CREATE, formData);
    return res.data.data;
}


export const getAllPackages = async (query = {}) => {
    const res = await axiosInstance.get(
        API_ROUTES.PACKAGE.GET_ALL(query)
    )
    
    return res.data.data
}

export const searchPackages = async (query) => {
    const { name, regions, activities } = query;
    const res = await axiosInstance.get(API_ROUTES.PACKAGE.SEARCH({ 
        name: name || undefined,
        regions, 
        activities 
    }));
    return res.data.data;
}

export const getPackageById = async (id) => {
    const res = await axiosInstance.get(API_ROUTES.PACKAGE.GET(id))
    return res.data.data;
}

export const getGuidePackages = async(id, { limit=20, page=1, ...filters } = {} )=>{
    const res = await axiosInstance.get(API_ROUTES.PACKAGE.GET_GUIDE_PACKAGES(id, {limit, page, filters}));
    return res.data.data;
}

export const getPackageCollaborators = async(pkgId) => {
    const res = await axiosInstance.get(API_ROUTES.PACKAGE.GET_COLLABORATORS(pkgId));
    return res.data.data;
}

export const updatePackage = async () => {
    const res = await axiosInstance.put(API_ROUTES.PACKAGE.BASE)
    return res.data;
}

export const deletePackage = async () => {
    const res = await axiosInstance.delete(API_ROUTES.PACKAGE.BASE)
}