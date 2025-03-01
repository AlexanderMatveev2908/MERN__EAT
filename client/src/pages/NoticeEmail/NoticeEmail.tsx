import { CircleCheckBig } from "lucide-react";
import { FC } from "react";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import {
  noticeEmailAllowedFrom,
  noticeEmailAllowedType,
} from "./noticeEmailFieldsArr";
import { useScrollTop } from "../../hooks/useScrollTop";

const NoticeEmail: FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const type = searchParams.get("type");
  const from = location?.state?.from;
  const hasBeenSentEmail = sessionStorage.getItem("sentEmail");

  useScrollTop();

  return !noticeEmailAllowedType.includes(type ?? "") ||
    !noticeEmailAllowedFrom.includes(from) ||
    !hasBeenSentEmail ? (
    <Navigate to="/" replace />
  ) : (
    <div className="w-full flex flex-col items-center gap-y-14">
      <div className="w-full flex justify-center">
        <span className="txt__04 leading-10 lg:leading-16">
          We&apos;ve sent you an email! If you don&apos;t see it, check your
          spam folder, it might be partying there
        </span>
      </div>

      <div className="w-full flex justify-center items-center">
        <CircleCheckBig className="w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] md:w-[400px] md:h-[400px] text-green-600" />
      </div>
    </div>
  );
};
export default NoticeEmail;
