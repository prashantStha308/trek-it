import express from 'express'
import {
    createPackage,
    createCustomPackage,

    getAllPacakages,
    getPackagesByGuide,
    getAllCollaborators,
    
    getPackageById,
    searchPackages,

    updatePackage,
    deletePackage,
} from "./package.controller.js";
import { parseFormFields } from "../../middlewares/package.middleware.js";
import { authorize } from "../../middlewares/authorize.js";
import {
    validatePackageBody,
    validatePackageQuery,
    validatePackageParams,
    validateCustomPackageMeta
} from "../../middlewares/validation/index.js";
import validate from "../../middlewares/validate.middleware.js";
import { bufferUpload } from "../../config/multer.config.js";


const packageR = express.Router();

packageR.post(
    '/', authorize(["guide", "admin"]),
    bufferUpload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "images", maxCount: 5 }
    ]),
    parseFormFields("keywords", "activities", "stops"),
    validatePackageBody, validate,
    createPackage
);

// packageR.post('/custom', authorize(["guide", "admin"]), bufferUpload.array("packageImage", 10), parseFormFields, validateCustomPackageMeta, validatePackageBody, validate, createCustomPackage);

packageR.get('/', validatePackageQuery, validate, getAllPacakages);
packageR.get('/search', validatePackageQuery, validate, searchPackages);

packageR.get('/guide/:guideId', validatePackageQuery, validate, getPackagesByGuide);
packageR.get('/collaborators/:packageId', validatePackageQuery, validate, getAllCollaborators);

packageR.get('/:packageId', validatePackageParams, validate, getPackageById);


packageR.patch('/:packageId', authorize(["guide", "admin"]), validatePackageParams, validate, updatePackage);
packageR.delete('/:packageId', authorize(["guide", "admin"]), validatePackageParams, validate, deletePackage);

export { packageR };