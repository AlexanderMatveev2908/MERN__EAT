import { FC, useState } from "react";
import CheckBoxSwitcher from "../../../../../forms/inputFields/CheckBoxSwitcher";
import { UseFormReturn } from "react-hook-form";
import { CiTextAlignCenter } from "react-icons/ci";
import { CheckBoxFieldType } from "../../../../../../core/config/fieldsArr/typesFields";
import DropHandlerIcon from "../../../../../components/cards/DropHandlerIcon";

type PropsType = {
  searchFields: CheckBoxFieldType[];
  formContext: UseFormReturn;
};

const TextFilter: FC<PropsType> = ({ searchFields, formContext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, watch, setValue } = formContext;

  const handleChange = (el: string) =>
    watch("searchVals").includes(el)
      ? setValue("searchVals", [], { shouldValidate: true })
      : setValue("searchVals", [el], { shouldValidate: true });

  return (
    <div className="w-full grid grid-cols-1">
      <DropHandlerIcon
        {...{
          isOpen,
          setIsOpen,
          txt: "Text",
          Icon: CiTextAlignCenter,
        }}
      />

      <div
        className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 transition-all duration-300 ${
          isOpen
            ? "max-h-[700px] opacity-100 pointer-events-auto py-2"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        {searchFields.map((el) => (
          <CheckBoxSwitcher
            key={el.id}
            {...{
              register,
              el,
              watch,
              handleChange,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default TextFilter;
