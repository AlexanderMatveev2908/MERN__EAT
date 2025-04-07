import { FC, useCallback } from "react";
import { useParams } from "react-router-dom";
import ParentContentLoading from "../../../UI/components/ParentContentLoading";
import { REG_MONGO } from "../../../core/config/constants/regex";
import { getReviewAPI } from "../../../core/api/APICalls/myReviews";
import { useQueryCustom } from "../../../core/hooks/useQueryCustom";
import { isObjOk } from "../../../utils/allUtils/validateData";
import AverageStars from "../../../UI/components/AverageStars";

const UpdateReview: FC = () => {
  const revId = useParams()?.revId;
  const canStay = REG_MONGO.test(revId ?? "");

  const cbSuccess = useCallback((data) => {
    console.log(data);
  }, []);

  const { isPendingRev, isErrorRev, errorRev, dataRev } = useQueryCustom({
    cbAPI: () => getReviewAPI(revId ?? ""),
    enabled: canStay,
    alias: "rev",
    key: "infoRev",
    cbSuccess,
  });

  const { review } = dataRev ?? {};

  return (
    <ParentContentLoading
      {...{
        canStay,
        isPending: isPendingRev,
        isError: isErrorRev,
        error: errorRev,
      }}
    >
      {isObjOk(review) && (
        <div className="w-full grid gap-8 justify-items-center">
          <span className="txt__04">{review.restaurant.name}</span>

          <AverageStars {...{ rest: review.restaurant }} />
        </div>
      )}
    </ParentContentLoading>
  );
};
export default UpdateReview;
