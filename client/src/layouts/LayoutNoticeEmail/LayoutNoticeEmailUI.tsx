import { FC } from "react";
import Header from "../../components/Header/Header";
import NoticeEmailSent from "../../pages/Authentication/NoticeEmailSent/NoticeEmailSent";
import Footer from "../../components/Footer/Footer";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import {
  layoutNoticeEmailAllowedFrom,
  layoutNoticeEmailAllowedTypes,
} from "./layoutNoticeEmailFieldsArr";

const LayoutNoticeEmailUI: FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const from = location?.state?.from;
  const type = searchParams.get("type");

  console.log(from);
  console.log(type);

  return !layoutNoticeEmailAllowedFrom.includes(from) ||
    !layoutNoticeEmailAllowedTypes.includes(type ?? "") ? (
    <Navigate to="/" replace />
  ) : (
    <>
      <Header />
      <div className="flex flex-col items-center w-full pad_page py-5 sm:py-10 pb-[150px] sm:pb-[250px] lg:pb-[350px] min-h-screen">
        <NoticeEmailSent />
      </div>
      <Footer />
    </>
  );
};
export default LayoutNoticeEmailUI;
