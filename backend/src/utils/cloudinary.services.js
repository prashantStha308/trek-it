import { Readable } from "stream";
import cloudinary from "../config/cloudinary.config.js";


// returns cloudinary response object.
// object.src will contain the link to file
// object.publicId will contain it's public ID
export const uploadToCloudinary = (fileBuffer, folder, resourceType = 'auto') => {
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

export const deleteFromCloudinary = async ( publicId , resourceType ) => {
    try {
        const res = await cloudinary.uploader.destroy( publicId , { resource_type: resourceType } );
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}