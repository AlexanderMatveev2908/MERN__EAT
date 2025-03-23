export const logQuery = (req, res, next) => {
    console.log(req.query);
    return next();
};
