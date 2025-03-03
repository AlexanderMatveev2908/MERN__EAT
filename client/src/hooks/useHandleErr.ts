/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useToast, useUser } from "./useGlobal";

export const useHandleErr = () => {
  const { showToastMsg } = useToast();
  const navigate = useNavigate();
  const { setCurrUser } = useUser();

  const handleErrAPI = ({
    err,
    push = false,
  }: // logUnauthorized = false,
  {
    err: any;
    push?: boolean;
    // logUnauthorized?: boolean;
  }) => {
    console.log(err);

    if (err?.response?.status === 401) {
      navigate("/", { replace: true });
      if (err?.response?.data?.msg === "REFRESH TOKEN EXPIRED") {
        setCurrUser();
        showToastMsg("Session Expired", "ERROR");
      } else {
        showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
      }
    } else if (err?.response?.status === 429) {
      navigate("/", { replace: true });
      showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
    } else {
      if (push) navigate("/", { replace: true });

      showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
    }

    // else if (
    //   logUnauthorized &&
    //   err?.response?.status === 401 &&
    //   err?.response?.data?.msg !== "REFRESH TOKEN EXPIRED"
    // ) {
    //   showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
    // }
  };

  return { handleErrAPI };
};
