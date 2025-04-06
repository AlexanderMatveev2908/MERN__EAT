import { makeMongoId } from "../dbPipeline/general.js";
export const makeQMyOrders = (req) => {
    const { userId } = req;
    const { ordersStatus, search, searchVals } = req.query;
    const queryObj = {};
    queryObj.userId = makeMongoId(userId !== null && userId !== void 0 ? userId : "");
    if (ordersStatus)
        queryObj.status = { $in: ordersStatus.split(",") };
    if (search && searchVals) {
        if (searchVals !== "id")
            queryObj[searchVals] = {
                $regex: `.*${search}.*`,
                $options: "i",
            };
        else
            queryObj["_id"] = makeMongoId(search);
    }
    return queryObj;
};
