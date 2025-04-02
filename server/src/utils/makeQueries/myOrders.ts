import { RequestWithUserId } from "../../middleware/general/verifyAccessToken.js";
import { makeMongoId } from "../dbPipeline/general.js";

export const makeQMyOrders = (req: RequestWithUserId) => {
  const { userId } = req;

  const { ordersStatus, search, searchVals } = req.query;

  const queryObj: any = {};
  queryObj.userId = makeMongoId(userId ?? "");
  if (ordersStatus)
    queryObj.status = { $in: (ordersStatus as string).split(",") };
  if (search && searchVals) {
    if (searchVals !== "id")
      queryObj[searchVals as string] = {
        $regex: `.*${search}.*`,
        $options: "i",
      };
    else queryObj["_id"] = makeMongoId(search as string);
  }

  return queryObj;
};
