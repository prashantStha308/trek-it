/**
 * @file Cloudinary Service
 * @description Provides helper functions to interact with Cloudinary for
 * uploading and deleting large files such as images, videos, audio,
 * and documents.
 *
 * @author Prashant Shrestha
 * @created March 2, 2026
 */


import { Readable } from "stream";
import cloudinary from "../config/cloudinary.config.js";
// helpers
import {validateFileExt} from "./generic.helper.js";

/**
 * @description Uploads a file buffer to Cloudinary.
 *
 * @param {Buffer} fileBuffer - The file buffer to upload from Multer.
 * @param {Object} options - Upload options.
 * @param {string} [options.folder="profilePicture"] - The Cloudinary folder where the file will be stored.
 * @param {('image'|'video'|'raw'|'auto')} [options.resourceType='auto'] - The type of resource being uploaded.
 * @returns {Promise<{src: string, public_id: string }>} Resolves with Cloudinary response object containing src and public ID.
 * @throws {Error} Throws an error if upload fails.
 */
export const uploadToCloudinary = (file, {folder = "profilePicture", resourceType = 'auto'}) => {
    return new Promise((resolve, reject) => {
        validateFileExt(file);

        const fileBuffer = file.buffer;
        const stream = Readable.from(fileBuffer);
        console.log("Uploading to cloudinary");

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                type: 'upload',
                resource_type: resourceType
            },
            (error, res) => {
                if (error) {
                    console.log(error);
                    return reject(error);
                }
                resolve(res);
            }
        );

        stream.pipe(uploadStream);
        console.log("Upload complete");
  });
};

/**
 * Deletes a file from Cloudinary.
 *
 * @param {string} publicId - Public ID of the resource in Cloudinary.
 * @param {string} resourceType - Resource type used during upload.
 * @returns {Promise<boolean>} True if deletion succeeded, else false.
 */
export const deleteFromCloudinary = async ( publicId , resourceType ) => {
    try {
        const res = await cloudinary.uploader.destroy( publicId , { resource_type: resourceType } );
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

// ---------------------------------------------------------------------

// format the response
const returnRes = async (promise) => {
    const res = await promise;
    return { publicId: res.public_id, src: res.secure_url  };
}

export const uploadImage = async (image, folder = "image") => {
    return await returnRes(uploadToCloudinary(image, { folder, type: "image" }));
}


export const uploadDoc = async (file, docType = "raw") => {
    return await returnRes(uploadToCloudinary(file, { folder: "docs", type: docType }));
} 

export const uploadImages = async (images, folder = "image") => {
    const response = await Promise.allSettled(images.map(image => uploadImage(image, folder)));

    return response
        .filter(res => res.status == "fulfilled")
        .map(res => res.value);
}


export const uploadDocs = async (files, docType = "raw") => {
    const response = await Promise.allSettled(files.map(file => uploadDoc(file, docType)));

    return response
        .filter(res => res.status == "fulfilled")
        .map(res => res.value);
}


export const deleteImage = async(publicId) =>await deleteFromCloudinary(publicId, "image")

export const deleteDocs = async(publicId) => await deleteFromCloudinary(publicId, "auto")