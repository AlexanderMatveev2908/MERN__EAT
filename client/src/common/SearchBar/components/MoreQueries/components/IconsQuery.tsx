import { FC, useState } from "react";
import DropHandler from "../../DropHandler";
import { UseFormReturn } from "react-hook-form";
import { IconFormType } from "../../../../../config/fieldsArr/MyRestaurants/filterSort";

type PropsType = {
  formContext: UseFormReturn;
  priceFields: IconFormType[];
};

const IconsQuery: FC<PropsType> = ({ formContext, priceFields }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full grid grid-cols-1">
      <DropHandler {...{ isOpen, setIsOpen, txt: "Search by price" }} />

      <div
        className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 transition-all duration-300 ${
          isOpen
            ? "max-h-[700px] opacity-100 pointer-events-auto py-2"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      ></div>
    </div>
  );
};
export default IconsQuery;
