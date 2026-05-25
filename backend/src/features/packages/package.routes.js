import express from 'express'
import {
    createPackage,
    getAllPacakages,
    getPackageById,
    getAllCollaborators,
    updatePackage,
    deletePackage,
    searchPackages,
    createCustomPackage,
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

packageR.post('/', authorize(["guide", "admin"]), bufferUpload.array("packageImage", 10), parseFormFields, validatePackageBody, validate, createPackage);
packageR.post('/custom', authorize(["guide", "admin"]), bufferUpload.array("packageImage", 10), parseFormFields, validateCustomPackageMeta, validatePackageBody, validate, createCustomPackage);

packageR.get('/', validatePackageQuery, validate, getAllPacakages);
packageR.get('/search', validatePackageQuery, validate, searchPackages);

packageR.get('/collaborators/:packageId', validatePackageQuery, validate, getAllCollaborators);

packageR.get('/:packageId', validatePackageParams, validate, getPackageById);


packageR.patch('/:packageId', authorize(["guide", "admin"]), validatePackageParams, validate, updatePackage);
packageR.delete('/:packageId', authorize(["guide", "admin"]), validatePackageParams, validate, deletePackage);

export { packageR };