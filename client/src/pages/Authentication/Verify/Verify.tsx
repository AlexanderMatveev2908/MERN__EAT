import { FC } from "react";
// import Spinner from "../../../components/Spinner/Spinner";
import { useVerify } from "./hooks/useVerify";
import { GridLoader } from "react-spinners";
import { useUpdateSizeLoader } from "./hooks/useUpdateSizeLoader";

const Verify: FC = () => {
  useVerify();

  const { size } = useUpdateSizeLoader();
  return (
    <div className="w-full h-[50vh] sm:h-[75vh] flex justify-center items-center">
      <GridLoader color="#f97316" size={size} />
      {/* <Spinner /> */}
    </div>
  );
};
export default Verify;
