import { FC, useEffect, useState } from "react";
import SideEL from "./SideEL";
import DropHandlerIcon from "../../../components/DropHandlerIcon";
import {
  BaseFieldShowIcon,
  SideDropFieldType,
} from "../../../../core/config/fieldsArr/typesFields";
import { useSidebar } from "../../../../core/hooks/useGlobal";

type PropsType = {
  handleSideClick: (path: string, from?: string) => void;
  el: BaseFieldShowIcon;
  fields: SideDropFieldType[];
};

const DropInsideSide: FC<PropsType> = ({ handleSideClick, el, fields }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { isOpenSide } = useSidebar();

  useEffect(() => {
    if (!isOpenSide) setIsOpen(false);
  }, [isOpenSide]);

  return (
    <div className="w-full grid grid-cols-1">
      <DropHandlerIcon
        {...{
          txt: el.label,
          Icon: el.icon,
          isOpen,
          setIsOpen,
          customIconStyle: "svg__sidebar",
        }}
      />

      <div
        className={`w-full grid grid-cols-1 el__flow gap-6 pl-5 ${
          isOpen
            ? "max-h-[500px] opacity-100 pointer-events-auto pt-3"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        {fields.map((el, i) => (
          <SideEL
            key={el.id}
            {...{
              el,
              handleSideClick,
              customStyle: !i ? "pt-2" : undefined,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default DropInsideSide;
