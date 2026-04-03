import { Package } from "../../models/index.js";

import {
    getAll,
    getById
} from "../../utils/crud.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const createPackage = async (req, res) => {
    
}

export const getAllPacakages = async (req, res) => {
    const { limit, page, ...filter } = req.query;
    
    const packages = await getAll(Package, {
        limit, page,
        filter,
        sort:{ rating: -1 }
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
    
}

export const deletePacakage = async (req, res) => {
    
}


