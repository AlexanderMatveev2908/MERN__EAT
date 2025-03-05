import { LogOut } from "lucide-react";
import { FC } from "react";
import SpinnerBtnReact from "../../../../loaders/SpinnerBtnReact/SpinnerBtnReact";

type PropsType = {
  handleLogout: () => void;
  isPending: boolean;
};

const LogoutBtn: FC<PropsType> = ({ handleLogout, isPending }) => {
  return isPending ? (
    <SpinnerBtnReact />
  ) : (
    <button
      onClick={handleLogout}
      className="ml-3 w-full flex gap-3 group max-w-fit items-center el__after_below"
    >
      <LogOut className="icon__sidebar" />

      <span className="cursor-pointer txt__02 group-hover:text-orange-500 transition-all duration-300">
        Logout
      </span>
    </button>
  );
};
export default LogoutBtn;
