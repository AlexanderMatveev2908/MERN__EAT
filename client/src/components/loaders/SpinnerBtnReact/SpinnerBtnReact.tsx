import { PulseLoader } from "react-spinners";
import { useUpdateSizeLoaderBtn } from "./../../../hooks/useUpdateSizeLoaderBtn";
const SpinnerBtnReact = () => {
  const { size } = useUpdateSizeLoaderBtn();

  return (
    <div className="w-full flex justify-center">
      <PulseLoader color="#f97316" size={size} />
    </div>
  );
};
export default SpinnerBtnReact;
