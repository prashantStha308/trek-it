import express from 'express'
import {
    createPackage,
    getAllPacakages,
    getPackageById,
    updatePackage,
    deletePackage,
} from "./package.controller.js";

const packageR = express.Router();

packageR.post('/', createPackage);
packageR.get('/', getAllPacakages);
packageR.get('/:packageId', getPackageById);
packageR.patch('/:packageId', updatePackage);
packageR.delete('/:packageId', deletePackage);

export { packageR };