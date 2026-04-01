import { query, param } from 'express-validator';

export const trimEscapeOptional = (...fields) =>
    fields.map(field => query(field).optional().trim().escape());

export const mongoIdParam = (...params) =>
    params.map(p => param(p).isMongoId().withMessage(`${p} must be a valid MongoDB ObjectId`));