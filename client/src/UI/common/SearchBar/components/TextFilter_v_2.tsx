/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import { CheckBoxFieldType } from "../../../../core/config/fieldsArr/typesFields";
import DropHandlerIcon from "../../../components/DropHandlerIcon";
import { CiTextAlignCenter } from "react-icons/ci";
import CheckBoxSwitcher from "../../../forms/inputFields/CheckBoxSwitcher";

type PropsType = {
  searchFields: CheckBoxFieldType[];
  formContext: UseFormReturn<any>;
  append: UseFieldArrayAppend<any>;
  remove: UseFieldArrayRemove;
};

const TextFilter_v_2: FC<PropsType> = ({
  searchFields,
  formContext,
  append,
  remove,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, watch, setValue } = formContext;

  useEffect(() => {
    const subscription = watch((vals) => {
      if (vals.items?.length && !vals.searchVals?.length) {
        setValue(
          "searchVals",
          vals.items.map((el: any) => el.searchVal)
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [setValue, watch]);

  const searchValsArr = watch("searchVals");

  const handleChange = (el: string) => {
    if ((searchValsArr ?? []).includes(el)) {
      //  here i can use index of searchVals cause i attributed to the field items in items a certain value based on index of searchVals so i can be based on it index to manage append remove operations on fields arr
      remove(searchValsArr.findIndex((val: string) => val === el));

      setValue(
        "searchVals",
        watch("searchVals").filter((val) => val !== el)
      );
    } else {
      setValue("searchVals", [...searchValsArr, el]);
      append({ searchVal: el, search: "" });
    }
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
export default TextFilter_v_2;
