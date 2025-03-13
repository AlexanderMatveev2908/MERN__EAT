export const baseErrResponse = (res, status, msg) => res.status(status).json({ success: false, msg: msg });
export const userNotFound = (res) => baseErrResponse(res, 404, "User not found");
export const badRequest = (res) => baseErrResponse(res, 400, "Bad request");
export const unauthorizedErr = (res, msg) => baseErrResponse(res, 401, msg);
export const forbiddenErr = (res) => baseErrResponse(res, 403, "User not allowed");
