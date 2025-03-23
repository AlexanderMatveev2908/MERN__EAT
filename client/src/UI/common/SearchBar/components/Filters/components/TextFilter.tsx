/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from "react";
import CheckBoxSwitcher from "../../../../../forms/inputFields/CheckBoxSwitcher";
import { UseFormReturn } from "react-hook-form";
import { CiTextAlignCenter } from "react-icons/ci";
import { CheckBoxFieldType } from "../../../../../../core/config/fieldsArr/typesFields";
import DropHandlerIcon from "../../../../../components/DropHandlerIcon";
import { REG_MONGO } from "../../../../../../core/config/constants/regex";

type PropsType = {
  searchFields: CheckBoxFieldType[];
  formContext: UseFormReturn<any>;
};

const TextFilter: FC<PropsType> = ({ searchFields, formContext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, watch, setValue, setError } = formContext;

  const handleChange = (el: string) => {
    if ((watch("searchVals") || []).includes(el))
      setValue("searchVals", [], { shouldValidate: true });
    else setValue("searchVals", [el], { shouldValidate: true });

    if (["id", "restaurantId"].includes(el) && !REG_MONGO.test(watch("search")))
      setError("search", { message: "Invalid Mongo ID" });
  };

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
        className={`w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 transition-all duration-300 ${
          isOpen
            ? "max-h-[700px] opacity-100 pointer-events-auto py-2"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        {!!searchFields?.length &&
          searchFields.map((el) => (
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
