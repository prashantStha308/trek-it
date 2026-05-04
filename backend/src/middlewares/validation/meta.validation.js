import { query } from 'express-validator';
import { validateBasicQuery } from "./user.validation.js";

export const validateMetaQueries = [
	...validateBasicQuery,
	query('sort').optional().isIn([ -1, 1 ]).withMessage("sort value can either be -1 or 1")
]