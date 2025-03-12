import { PulseLoader } from "react-spinners";
import { useUpdateSizeLoaderBtn } from "./useUpdateSizeLoaderBtn";
import { FC } from "react";

type PropsType = {
  sizeGiven?: number;
};

const SpinnerBtnReact: FC<PropsType> = ({ sizeGiven }) => {
  const { size } = useUpdateSizeLoaderBtn();

  return (
    <div className="w-full flex max-w-fit">
      <PulseLoader color="#f97316" size={sizeGiven ?? size} />
    </div>
  );
};
export default SpinnerBtnReact;
