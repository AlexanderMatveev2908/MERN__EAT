import { Trash2 } from "lucide-react";
import { FC } from "react";
import SpinnerBtnReact from "../loaders/SpinnerBtnReact/SpinnerBtnReact";

type PropsType = {
  handleDelete: () => void;
  txt: string;
  border?: boolean;
  isDisabled?: boolean;
  isPending?: boolean;
};

const DeleteButton: FC<PropsType> = ({
  handleDelete,
  txt,
  border = true,
  isDisabled,
  isPending,
}) => {
  return isPending ? (
    <SpinnerBtnReact />
  ) : (
    <button
      disabled={isDisabled}
      type="button"
      onClick={handleDelete}
      className={`min-w-full group ${
        border ? "border-2 border-red-600 " : ""
      }el__flow hover:scale-110 rounded-xl gap-3 cursor-pointer`}
    >
      <div className="py-2 px-4 w-full flex justify-center gap-3">
        <Trash2 className="w-[30px] h-[30px] el__flow group-hover:text-red-600" />
        <span className="txt__02 el__flow group-hover:text-red-600">{txt}</span>
      </div>
    </button>
  );
};
export default DeleteButton;
