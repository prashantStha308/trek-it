import {
    Package,
    Guide
} from "../../models/index.js";

import { getAll, getById } from "../../utils/crud.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import {
    createPackageService,
    searchPackageService,
    deletePackageService,
    updatePackageService,
} from "./package.service.js";


const GUIDE_SELECT = "_id name gender age profilePicture role location languages specialities regions rating isVerified isTrusted"


export const createPackage = async (req, res) => {
    const pkg = await createPackageService(req.body, req.user._id, req.files);

    ApiResponse.success(res, {
        status: 200,
        data: pkg,
        message: "Package created Successfully. Currently being verified",
    });
};

export const curatePackage = async (req, res) => {
    // curate a custom package based on user's request
};


export const getAllPacakages = async (req, res) => {
    const { limit, page, ...filter } = req.query;

    const packages = await getAll(Package, {
        limit,
        page,
        filter,
        sort: { rating: -1 },
        populate: [
            {
                path: "guide",
                select: GUIDE_SELECT,
            },
            {
                path: "collaborators",
                select: GUIDE_SELECT,
            },
        ],
    });

    ApiResponse.success(res, {
        data: packages,
        message: "Packages retrived successfully",
    });
};

export const getPackagesByGuide = async (req, res) => {
    let { limit, page, sort, ...filter } = req.query;
    const {guideId} = req.params;

    const packages = await getAll(Package, {
        limit,
        page,
        filter: {...filter, guide: guideId},
        sort: { rating: -1 },
        populate: [
            {
                path: "guide",
                select: GUIDE_SELECT,
            },
            {
                path: "collaborators",
                select: GUIDE_SELECT,
            },
        ],
    });

    ApiResponse.success(res, {
        data: packages,
        message: "Packages retrived successfully",
    });

};

export const searchPackages = async (req, res) => {
    const pkg = await searchPackageService(req.query);
    return ApiResponse.success(res, {
        data: pkg,
    });
};

export const serachPackageInPriceRange = () => {
    // make this later
};

export const getPackageById = async (req, res) => {
    const pkg = await getById(Package, req.params.packageId, {
        populate: {
            path: "guide",
            select: GUIDE_SELECT,
        },
    });

    ApiResponse.success(res, {
        data: pkg,
        message: "Package retrived successfully",
    });
};

export const getAllCollaborators = async (req, res) => {
    const { packageId } = req.params;
    const { limit, page, ...filter } = req.query;

    filter["collaborations"] = packageId;

    const collaborators = await getAll(Guide, {
        limit,
        page,
        filter,
        sort: { rating: -1 },
        select: GUIDE_SELECT,
    });

    ApiResponse.success(res, {
        data: collaborators,
        message: "Collaborators retrived successfully",
    });
};

export const updatePackage = async (req, res) => {
    const pkg = await updatePackageService(
        req.user,
        req.params.packageId,
        req.body,
        req.files,
    );

    ApiResponse.success(res, {
        data: pkg,
        message: "Package updated successfully",
    });
};

export const deletePackage = async (req, res) => {
    const pkg = await deletePackageService(req.params.packageId);

    ApiResponse.success(res, {
        data: pkg,
        message: "Package deleted successfully",
    });
};
