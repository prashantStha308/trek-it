export const parseFormFields = (req, res, next) => {
    if (req.body.dates) req.body.dates = JSON.parse(req.body.dates);
    if (req.body.keywords) req.body.keywords = JSON.parse(req.body.keywords);
    if (req.body.regions) req.body.regions = JSON.parse(req.body.regions);
    if (req.body.activities) req.body.activities = JSON.parse(req.body.activities);
    next();
}