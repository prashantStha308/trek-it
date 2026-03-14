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


/**
 * Uploads a file buffer to Cloudinary.
 *
 * @param {Buffer} fileBuffer - File buffer received from multer.
 * @param {string} folder - Cloudinary folder where file will be stored.
 * @param {string} resourceType - Type of resource (image, video, raw, auto), defaults to auto.
 * @returns {Promise<Object>} Cloudinary response object containing URL and public ID.
 */
export const uploadToCloudinary = (fileBuffer, folder = "profilePicture", resourceType = 'auto') => {
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


export const uploadProfilePicture = async(file) =>{
    return uploadToCloudinary(file.buffer, "profilePicture", "image") 
}

export const uploadDocs = async(file, docType) =>{
    return uploadToCloudinary(file.buffer, "doc", "auto") 
}


export const deleteProfilePicture = async(publicId) =>{
    return deleteFromCloudinary(publicId, "image"); 
}

export const deleteDocs = async(publicId) =>{
    return deleteFromCloudinary(publicId, "auto"); 
}