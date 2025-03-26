export const logReq = (req, res, next) => {
    console.log(req.query);
    console.log(req.body);
    return next();
};
