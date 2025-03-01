import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";

const Verify: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="max-w-3/4 max-h-3/4 md:w-1/2 md:h-1/2 lg:max-w-[35%] lg:max-h-[35%] pt-[50px] pb-[100px] sm:p-0 min-h-[50vh] w-full flex items-center justify-center ">
      <Spinner />
    </div>
  );
};
export default Verify;
