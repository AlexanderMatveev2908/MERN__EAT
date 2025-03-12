/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { useScrollTop } from "../../hooks/useScrollTop";
import CheckBoxSwap from "../../components/commonCompForms/CheckBoxSwap";
import { useForm } from "react-hook-form";
import { fieldTest } from "../../config/fieldsArr/MyRestaurants/filterSort";

const Home: FC = () => {
  useScrollTop();

  const { register, watch } = useForm({ mode: "onChange" });

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

      <div className="w-full flex justify-center">
        <CheckBoxSwap {...{ register, field: fieldTest, watch }} />
      </div>
    </div>
  );
};
export default Home;
