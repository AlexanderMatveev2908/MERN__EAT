import { FC, useState } from "react";
import DropHandlerIcon from "../../../components/cards/DropHandlerIcon";
import {
  fieldAdminDrop,
  fieldsAdmin,
} from "../../../../core/config/fieldsArr/allFields/dropSideFields";
import SideEL from "./SideEL";
import { useLocation, useSearchParams } from "react-router-dom";

type PropsType = {
  handleSideClick: (path: string, from?: string) => void;
};

const DropAdmin: FC<PropsType> = ({ handleSideClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  return (
    <div className="w-full grid grid-cols-1">
      <DropHandlerIcon
        {...{
          txt: fieldAdminDrop.label,
          Icon: fieldAdminDrop.icon,
          isOpen,
          setIsOpen,
          customIconStyle: "min-w-[40px] min-h-[40px]",
        }}
      />
      <div
        className={`w-full grid grid-cols-1 el__flow gap-6 ${
          isOpen
            ? "max-h-[500px] opacity-100 pointer-events-auto pt-3"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        {fieldsAdmin.map((el) => (
          <SideEL key={el.id} {...{ el, location, type, handleSideClick }} />
        ))}
      </div>
    </div>
  );
};
export default DropAdmin;
