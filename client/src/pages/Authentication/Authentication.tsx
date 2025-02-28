import { FC } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";

const Authentication: FC = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full grid grid-cols-1 gap-y-16">
        <div className="w-full flex justify-center">
          <span className="txt__04">Login</span>
        </div>

        <div className="w-full justify-self-center max-w-[600px] grid grid-cols-1 border-2 border-orange-500 rounded-xl">
          <Login />
          <Register />
        </div>
      </div>
    </div>
  );
};
export default Authentication;
