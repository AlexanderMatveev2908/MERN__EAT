/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash2 } from "lucide-react";
import { FC } from "react";

type PropsType = {
  handleDelete: (params: any) => void;
  txt: string;
};

const DeleteButton: FC<PropsType> = ({ handleDelete, txt }) => {
  return (
    <button
      onClick={handleDelete}
      className="max-w-fit group border-2 border-red-600 el__flow hover:scale-110 rounded-xl gap-3 cursor-pointer"
    >
      <div className="px-4 pr-6 py-2 w-full flex justify-start gap-3">
        <Trash2 className="w-[30px] h-[30px] el__flow group-hover:text-red-600" />
        <span className="txt__02 el__flow group-hover:text-red-600">
          Delete {txt}
        </span>
      </div>
    </button>
  );
};
export default DeleteButton;
