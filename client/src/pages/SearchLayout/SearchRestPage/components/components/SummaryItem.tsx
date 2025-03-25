import { X } from "lucide-react";
import { FC } from "react";

const SummaryItem: FC = () => {
  return (
    <li className="w-full grid grid-cols-2 items-start sm:items-center">
      <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] justify-items-center">
        <div className="w-full flex items-center gap-3">
          <span className="txt__01">item_1</span>

          <span className="txt__01">x</span>

          <span className="txt__01">10</span>
        </div>

        <span className="txt__01">$10.00</span>
      </div>

      <div className="w-full grid grid-cols-[1fr_60px] items-start sm:items-center justify-self-end">
        <span className="txt__01 justify-self-end">$100.00</span>

        <button className="w-fit p-1 border-2 border-red-600 rounded-xl group hover:scale-120 el__flow flex items-start sm:items-center justify-center cursor-pointer justify-self-end -mt-2 sm:mt-0">
          <X className="min-w-[15px] min-h-[15px] group-hover:text-red-600 el__flow" />
        </button>
      </div>
    </li>
  );
};
export default SummaryItem;
