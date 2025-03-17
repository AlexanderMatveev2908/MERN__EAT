import { Link } from "react-router-dom";
import { makeLinksMyRestPage } from "../../../../core/config/fieldsArr/allFields/MyRestaurants/show";
import { FC, useState } from "react";
import DropHandlerIcon from "../../../../UI/components/cards/DropHandlerIcon";
import { MdAdminPanelSettings } from "react-icons/md";

type PropsType = {
  restId: string | undefined;
};

const DropOptionsBusiness: FC<PropsType> = ({ restId }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full grid grid-cols-1 mt-5 relative">
      <div className="h-[75px]"></div>

      <div className="border-2 border-orange-500 rounded-xl w-fit justify-self-end py-2 px-3 absolute z-10 bg-[#111]">
        <div className="w-full ">
          <DropHandlerIcon
            {...{
              isOpen,
              setIsOpen,
              txt: "Business",
              Icon: MdAdminPanelSettings,
            }}
          />
        </div>

        <ul
          className={`w-full grid grid-cols-1 el__flow pl-1 gap-6 ${
            isOpen
              ? "opacity-100 pointer-events-auto max-h-[500px] pb-4"
              : "opacity-0 pointer-events-none max-h-0"
          }`}
        >
          {makeLinksMyRestPage(restId ?? "").map((el) => (
            <li
              key={el.id}
              className="w-full flex items-center gap-3 group el__flow cursor-pointer first:pt-4 hover:text-orange-500 el__after_below"
            >
              <Link to={el.path} className="w-full flex items-center gap-3">
                {
                  <el.icon className="min-w-[25px] min-h-[25px] group-hover:text-orange-500 el__flow" />
                }

                <span className="txt__02 group-hover:text-orange-500 el__flow ">
                  {el.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default DropOptionsBusiness;
