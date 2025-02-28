import { FC, useEffect } from "react";
import { foodAppInstance } from "../../constants/axiosInstance";

const Home: FC = () => {
  useEffect(() => {
    const testProtected = async () => {
      const { data } = await foodAppInstance.get("/protected");
      console.log(data);
    };

    testProtected();
  }, []);

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
    </div>
  );
};
export default Home;
