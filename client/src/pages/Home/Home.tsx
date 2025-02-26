import { FC } from "react";
import RangeInput from "../../components/RangeInput/RangeInput";

const Home: FC = () => {
  return (
    <div className="w-full flex flex-col items-center gap-y-5">
      <div className="w-full flex flex-col items-start gap-y-3">
        <span className="txt__04 text-orange-500">
          Order Comfortably From Home
        </span>
        <span className="txt__04 text-orange-500">
          Or Manage Your Business From Anywhere
        </span>
      </div>

      <div className="w-full flex">
        <RangeInput />
      </div>
    </div>
  );
};
export default Home;
