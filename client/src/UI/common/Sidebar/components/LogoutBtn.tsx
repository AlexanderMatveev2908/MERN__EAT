import { LogOut } from "lucide-react";
import { FC } from "react";
import SpinnerBtnReact from "../../../components/loaders/SpinnerBtnReact/SpinnerBtnReact";

type PropsType = {
  handleLogout: () => void;
  isPending: boolean;
};

const LogoutBtn: FC<PropsType> = ({ handleLogout, isPending }) => {
  return isPending ? (
    <div className="ml-3">
      <SpinnerBtnReact />
    </div>
  ) : (
    <button
      onClick={handleLogout}
      className="ml-3 w-full flex gap-3 group max-w-fit items-center el__after_below"
    >
      <LogOut className="svg__sidebar" />

      <span className="cursor-pointer txt__02 group-hover:text-orange-500 el__flow">
        Logout
      </span>
    </button>
  );
};
export default LogoutBtn;
