import { FC } from "react";
// import Spinner from "../../../components/Spinner/Spinner";
import { useVerify } from "./hooks/useVerify";
import { GridLoader } from "react-spinners";
import { useUpdateSizeLoader } from "./hooks/useUpdateSizeLoader";
import { Navigate } from "react-router-dom";

const Verify: FC = () => {
  const { canStay } = useVerify();

  const { size } = useUpdateSizeLoader();
  return !canStay ? (
    <Navigate to="/" replace />
  ) : (
    <div className="w-full h-[50vh] sm:h-[75vh] flex justify-center items-center">
      <GridLoader color="#f97316" size={size} />
      {/* <Spinner /> */}
    </div>
  );
};
export default Verify;
