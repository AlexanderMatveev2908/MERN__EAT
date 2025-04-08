import { RestaurantAllUsers } from "../../../types/allTypes/search";
import { ReturnAPIBasic, ReviewType } from "../../../types/types";
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
}): Promise<ReturnAPIBasic & { revId: string }> =>
  destructureDataAPI(() =>
    foodAppInstance.post(`/my-reviews/${restId}`, formData)
  );

export const getReviewAPI = (
  revId: string
): Promise<ReturnAPIBasic & { review: ReviewType }> =>
  destructureDataAPI(() => foodAppInstance.get(`/my-reviews/${revId}`));

export const updateReview = ({
  revId,
  formData,
}: {
  revId: string;
  formData: FormData;
}): Promise<ReturnAPIBasic> =>
  destructureDataAPI(() =>
    foodAppInstance.put(`/my-reviews/${revId}`, formData)
  );

export const deleteReviewAPI = (revId: string): Promise<void> =>
  destructureDataAPI(() => foodAppInstance.delete(`/my-reviews/${revId}`));
