import { PulseLoader } from "react-spinners";
import { useUpdateSizeLoaderBtn } from "./useUpdateSizeLoaderBtn";
import { FC } from "react";

type PropsType = {
  sizeGiven?: number;
  styleGiven?: string;
};

const SpinnerBtnReact: FC<PropsType> = ({ sizeGiven, styleGiven }) => {
  const { size } = useUpdateSizeLoaderBtn();

  return (
    <div className={`w-full flex ${styleGiven ?? "justify-center"}`}>
      <PulseLoader color="#f97316" size={sizeGiven ?? size} />
    </div>
  );
};
export default SpinnerBtnReact;
