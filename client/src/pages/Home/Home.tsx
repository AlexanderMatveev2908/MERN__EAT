import { FC } from "react";
import BlockPages from "../../components/BlockPages/BlockPages";

const Home: FC = () => {
  return (
    <div className="w-full flex flex-col items-center gap-y-5">
      <div className="w-full flex flex-col items-start gap-y-3">
        <span className="txt__04 text-[whitesmoke]">
          Order Comfortably From Home
        </span>
        <span className="txt__04 text-[whitesmoke]">
          Or Manage Your Business From Anywhere
        </span>
      </div>

      <div className="w-full flex">
        <BlockPages />
      </div>
    </div>
  );
};
export default Home;
