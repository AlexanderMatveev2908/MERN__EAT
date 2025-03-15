import { FC } from "react";
import { GridLoader } from "react-spinners";
import { useUpdateSizeLoaderPage } from "./useUpdateSizeLoader";

const LoaderPageReact: FC = () => {
  const { size } = useUpdateSizeLoaderPage();
  return (
    <div className="w-full h-[50vh] sm:h-[75vh] flex justify-center items-center">
      <GridLoader color="#f97316" size={size} />
    </div>
  );
};
export default LoaderPageReact;
