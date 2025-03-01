import { CircleCheckBig } from "lucide-react";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useNoticeEmail } from "./useNoticeEmail";

const NoticeEmail: FC = () => {
  const { canStay } = useNoticeEmail();

  return !canStay ? (
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
