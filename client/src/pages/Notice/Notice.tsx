import { FC } from "react";
import { validateStrWithArr } from "../../utils/utils";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useNotice } from "../../core/hooks/useGlobal";
import { CircleCheckBig } from "lucide-react";

const Notice: FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const { notice } = useNotice();

  const type = searchParams.get("type");
  const from = location?.state?.from;

  const canStay =
    validateStrWithArr(
      [
        "verify-account",
        "recover-pwd",
        "sentEmailUnsubscribe",
        "change-email",
        "change-pwd",
      ],
      type ?? ""
    ) &&
    validateStrWithArr(
      [
        "/auth/register",
        "/auth/login",
        "/newsletter/notice-unsubscribe-with-retry",
        "/user/manage-account",
      ],
      from
    );

  return !canStay ? (
    <Navigate to="/" replace />
  ) : (
    <div className="w-full flex justify-center items-center">
      <div className="w-full flex flex-col items-center gap-30">
        {notice ? (
          <>
            <span className="txt__04 leading-10 lg:leading-16">
              {notice.msg}
            </span>

            <div className="w-full flex justify-center items-center">
              {notice.type === "success" ? (
                <CircleCheckBig className="notice text-red-600" />
              ) : (
                <MdOutlineErrorOutline className="notice text-red-600" />
              )}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
export default Notice;
