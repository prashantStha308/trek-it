import express from "express";
import {
	getAllRegions,
	getAllActivities,
	getAllSpecialities,
} from "./meta.controller.js"
import validate from "../../middlewares/validate.middleware.js";
import {validateMetaQueries} from "../../middlewares/validation/index.js";


const metaR = express.Router();

const makeGetRoutes = (field, func)=>{
	metaR.get(`/${field}`, validateMetaQueries, validate, func)
}

makeGetRoutes('regions', getAllRegions);
makeGetRoutes('activities', getAllActivities);
makeGetRoutes('specialities', getAllSpecialities);

export {metaR};