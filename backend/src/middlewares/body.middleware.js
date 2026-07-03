import ApiError from "../utils/ApiError.js";

export const parseFormFields = (...fieldsToParse) => (req, res, next) => {
    try {

        fieldsToParse.forEach((fieldName) => {
            if (req.body[fieldName]) {
		console.log("parsing", req.body[fieldName])
                req.body[fieldName] = JSON.parse(req.body[fieldName]);
            }
        });
        next();
    } catch (error) {
        next(new ApiError(400, "Invalid JSON in form fields"));
    }
};
