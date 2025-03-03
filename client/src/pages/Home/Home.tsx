/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import { useScrollTop } from "../../hooks/useScrollTop";
import { foodAppInstance } from "../../constants/axiosInstance";
import { useHandleErr } from "../../hooks/useHandleErr";

const Home: FC = () => {
  useScrollTop();

  const { handleErrAPI } = useHandleErr();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const { data } = await foodAppInstance.get("/auth/user");

        console.log(data);
      } catch (err: any) {
        handleErrAPI({ err });
      }
    };

    // getInfo();
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
