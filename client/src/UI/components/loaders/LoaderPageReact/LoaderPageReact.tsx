import { FC } from "react";
import Spinner from "./Spinner/Spinner";

type PropsType = {
  pad?: string;
};

const LoaderPageReact: FC<PropsType> = ({ pad }) => {
  return (
    <div
      className={`w-full flex justify-center items-center ${
        pad ?? "pt-[20vw] lg:pt-[12.5vw]"
      }`}
    >
      <Spinner />
    </div>
  );
};
export default LoaderPageReact;
