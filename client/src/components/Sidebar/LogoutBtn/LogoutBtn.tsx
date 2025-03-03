import { LogOut } from "lucide-react";
import { FC } from "react";
import { PulseLoader } from "react-spinners";

type PropsType = {
  handleLogout: () => void;
  isPending: boolean;
};

const LogoutBtn: FC<PropsType> = ({ handleLogout, isPending }) => {
  return isPending ? (
    <div className="w-full flex justify-start">
      {/* <SpinnerBtn /> */}
      <PulseLoader color="#f97316" size={40} />
    </div>
  ) : (
    <button
      onClick={handleLogout}
      className="w-full flex gap-3 group max-w-fit items-center el__after_below"
    >
      <LogOut className="icon__sidebar" />

      <span className="cursor-pointer txt__02 group-hover:text-orange-500 transition-all duration-300">
        Logout
      </span>
    </button>
  );
};
export default LogoutBtn;
