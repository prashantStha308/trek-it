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
 * @returns {Promise<{url: string, public_id: string, [key: string]: any}>} Resolves with Cloudinary response object containing URL, public ID, and other metadata.
 * @throws {Error} Throws an error if upload fails.
 */
export const uploadToCloudinary = (fileBuffer, {folder = "profilePicture", resourceType = 'auto'}) => {
    return new Promise((resolve, reject) => {
        const stream = Readable.from(fileBuffer);

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                type: 'private',
                resource_type: resourceType
            },
            (error, res) => {
                if (error) {
                    return reject(error);
                }
                resolve(res);
            }
        );

        stream.pipe(uploadStream);
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


export const uploadImage = async(file) =>{
    return uploadToCloudinary(file.buffer, {folder: "profilePicture", type: "image"}) 
}

export const uploadDocs = async(file, docType) =>{
    validateFileExt(file);

    return uploadToCloudinary(file.buffer, "doc", "raw") 
}


export const deleteImage = async(publicId) =>{
    return deleteFromCloudinary(publicId, "image"); 
}

export const deleteDocs = async(publicId) =>{
    return deleteFromCloudinary(publicId, "auto"); 
}