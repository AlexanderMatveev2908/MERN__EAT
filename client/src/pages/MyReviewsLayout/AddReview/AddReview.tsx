import { FC, useCallback } from "react";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import { Navigate, useParams } from "react-router-dom";
import { REG_MONGO } from "../../../core/config/constants/regex";
import { useQueryCustom } from "../../../core/hooks/useQueryCustom";
import { getRestInfoAPI } from "../../../core/api/APICalls/myReviews";
import ParentContentLoading from "../../../UI/components/ParentContentLoading";
import { useToast } from "../../../core/hooks/useGlobal";
import { isObjOk } from "../../../utils/allUtils/validateData";
import AverageStars from "../../../UI/components/AverageStars";

const AddReview: FC = () => {
  const restId = useParams()?.restId;
  const canStay = REG_MONGO.test(restId ?? "");

  useScrollTop();
  const { showToastMsg } = useToast();

  const cbSuccess = useCallback(
    (data) => {
      showToastMsg("OK", "SUCCESS");
      console.log(data);
    },
    [showToastMsg]
  );

  const { isPendingRest, isErrorRest, errorRest, dataRest } = useQueryCustom({
    cbAPI: () => getRestInfoAPI(restId ?? ""),
    enabled: canStay,
    alias: "rest",
    key: "restInfoRev",
    cbSuccess,
  });

  const { restaurant: rest } = dataRest ?? {};

  return !canStay ? (
    <Navigate to="/" replace />
  ) : (
    <ParentContentLoading
      {...{
        isPending: isPendingRest,
        isError: isErrorRest,
        error: errorRest,
        canStay,
      }}
    >
      {isObjOk(rest) && (
        <div className="w-full grid gap-8 justify-items-center">
          <span className="txt__04">{rest.name}</span>

          <AverageStars {...{ rest }} />
        </div>
      )}
    </ParentContentLoading>
  );
};
export default AddReview;
