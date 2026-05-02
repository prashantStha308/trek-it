import { Package } from "../../models/index.js";

import {
    getAll,
    getById
} from "../../utils/crud.service.js";
import ApiResponse from "../../utils/ApiResponse.js";
import {
    createPackageService,
    deletePackageService,
    updatePackageService
} from "./package.service.js";

export const createPackage = async (req, res) => {

    const pkg = await createPackageService(req.body, req.user._id, req.files);
    
    ApiResponse.success(res, {
        status: 200,
        data: pkg,
        message: "Package created Successfully. Currently being verified"
    })
}

export const curatePackage = async (req,res) => {
    // curate a custom package based on user's request
}

export const createCustomPackage = async (req, res) => {
    // custom request created by guide after discussion with the tourist
}

export const getAllPacakages = async (req, res) => {
    const { limit, page, ...filter } = req.query;
    
    const packages = await getAll(Package, {
        limit, page,
        filter,
        sort: { rating: -1 },
        populate: [
            { path: "guide", select: "_id name profilePicture languages specialities regions gender age location" },
            { path: "collaborators", select: "_id name profilePicture languages specialities regions gender age location" }
        ]
    });

    ApiResponse.success(res, {
        data: packages,
        message: "Packages retrived successfully"
    });
}


export const getPackageById = async (req, res) => {
    const pkg = await getById(Package, req.params.packageId, {
        populate: {
            path: "guide",
            select: "name profilePicture gender age languages isVerified rating"
        }
    });

    ApiResponse.success(res, {
        data: pkg,
        message: "Package retrived successfully"
    });

}

export const updatePackage = async (req, res) => {
    const pkg = await updatePackageService( req.user._id, req.body, req.params.packageId, req.body, req.files);

    ApiResponse.success(res, {
        data: pkg,
        message: "Package updated successfully"
    });
}

export const deletePackage = async (req, res) => {
    const pkg = await deletePackageService(req.params.packageId);

    ApiResponse.success(res, {
        data: pkg,
        message: "Package deleted successfully"
    })
}


