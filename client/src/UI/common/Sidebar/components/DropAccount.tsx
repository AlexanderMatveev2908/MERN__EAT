import { FC, useState } from "react";
import SideEL from "./SideEL";
import { nonLoggedUserFields } from "../../../../core/config/fieldsArr/fields";
import DropHandlerIcon from "../../../components/DropHandlerIcon";
import { fieldAccountDrop } from "../../../../core/config/fieldsArr/allFields/dropSideFields";

type PropsType = {
  handleSideClick: (path: string, from?: string) => void;
};

const DropAccount: FC<PropsType> = ({ handleSideClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full grid grid-cols-1">
      <DropHandlerIcon
        {...{
          txt: fieldAccountDrop.label,
          Icon: fieldAccountDrop.icon,
          isOpen,
          setIsOpen,
          customIconStyle: "min-w-[40px] min-h-[40px]",
        }}
      />

      <div
        className={`w-full grid grid-cols-1 el__flow gap-6 pl-5 ${
          isOpen
            ? "max-h-[500px] opacity-100 pointer-events-auto pt-3"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        {nonLoggedUserFields.map((el, i) => (
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
export default DropAccount;
