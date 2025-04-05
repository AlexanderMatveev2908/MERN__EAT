import { LogOut } from "lucide-react";
import { FC } from "react";
import SpinnerBtnReact from "../../../components/loaders/SpinnerBtnReact/SpinnerBtnReact";
import DropDownHeader from "../../../components/DropDownHeader/DropDownHeader";
import { useLogout } from "../../../../core/hooks/auth/useLogout";

const DropLogged: FC = () => {
  const { mutate, isPending } = useLogout();

  const handleDropLogout = () => {
    mutate();
  };

  return (
    <DropDownHeader {...{ isLogged: true }}>
      {isPending ? (
        <div className="h-[50px] w-full flex items-center justify-start pl-5">
          <SpinnerBtnReact />
        </div>
      ) : (
        <button
          onClick={handleDropLogout}
          className="w-full cursor-pointer flex gap-3 pl-3 pr-10 py-3 justify-start group"
        >
          <LogOut className="svg__drop" />
          <span className="txt__01 group-hover:text-orange-500 duration-300 transition-all">
            Logout
          </span>
        </button>
      )}
    </DropDownHeader>
  );
};
export default DropLogged;
