import { Trash2 } from "lucide-react";
import { FC } from "react";

const DeleteAccountBtn: FC = () => {
  return (
    <div className="w-full flex">
      <button className="max-w-fit group border-2 border-orange-500 transition-all duration-300 hover:scale-120 rounded-xl gap-3 cursor-pointer">
        <div className="px-5 py-2 w-full flex justify-start gap-3">
          <Trash2 className="w-[30px] h-[30px] transition-all duration-300 group-hover:text-orange-500" />
          <span className="txt__02 transition-all duration-300 group-hover:text-orange-500">
            Delete Account
          </span>
        </div>
      </button>
    </div>
  );
};
export default DeleteAccountBtn;
