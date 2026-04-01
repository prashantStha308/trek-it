import { validationResult } from 'express-validator';
import ApiError from '../utils/ApiError';

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new ApiError(400, "Validation Error/s", errors.array()));
    }

    next();
};

export default validate;