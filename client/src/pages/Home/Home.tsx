import { FC } from "react";
// import Spinner from "../../components/Spinner/Spinner";

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
      {/* <div className="w-3/4 h-3/4 md:w-1/2 md:h-1/2 xl:max-w-[40%%] xl:max-h-[40%] 2xl:max-w-[35%] 2xl:max-h-[35%]">
        <Spinner />
      </div> */}
    </div>
  );
};
export default Home;
