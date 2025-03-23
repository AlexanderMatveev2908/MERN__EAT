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

  console.log(watch());

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

  const handleChange = (el: string) => {
    if ((watch("searchVals") || []).includes(el)) {
      remove(watch("searchVals").findIndex((val: string) => val === el));

      setValue(
        "searchVals",
        watch("searchVals").filter((val) => val !== el)
      );
    } else {
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
