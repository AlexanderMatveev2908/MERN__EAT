import { RestaurantAllUsers } from "../../../types/allTypes/search";
import { ReturnAPIBasic } from "../../../types/types";
import { destructureDataAPI } from "../../../utils/allUtils/apiUtils";
import { foodAppInstance } from "../../config/constants/axiosInstance";

export const getRestInfoAPI = (
  restId: string
): Promise<ReturnAPIBasic & { restaurant: RestaurantAllUsers }> =>
  destructureDataAPI(() =>
    foodAppInstance.get(`/my-reviews/rest-info/${restId}`)
  );

export const createReviewAPI = ({
  restId,
  formData,
}: {
  restId: string;
  formData: FormData;
}) =>
  destructureDataAPI(() =>
    foodAppInstance.post(`/my-reviews/${restId}`, formData)
  );
