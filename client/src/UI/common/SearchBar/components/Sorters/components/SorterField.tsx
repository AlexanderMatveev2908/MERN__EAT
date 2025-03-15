import { FC, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import RadioInput from "../../../../../forms/inputFields/RadioInput";
import { SorterFieldType } from "../../../../../../core/config/fieldsArr/allFields/MyRestaurants/filterSort";
import { ChevronDown } from "lucide-react";

type PropsType = {
  sorter: SorterFieldType;
  formContext: UseFormReturn;
};

const SorterField: FC<PropsType> = ({ formContext, sorter }) => {
  const { register, watch, setValue } = formContext;
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (val: string) =>
    setValue(
      sorter.field,
      (watch(sorter.field) || []).includes(val)
        ? watch(sorter.field).filter((el: string) => el !== val)
        : [val],
      { shouldValidate: true }
    );

  return (
    <div className="w-full grid grid-cols-1 gap-y-3">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full grid items-center grid-cols-[100px_1fr] group cursor-pointer"
      >
        <div className="w-full flex items-center gap-5">
          {<sorter.icon className="min-w-[30px] min-h-[30px]" />}

          <span className="txt__02">{sorter.label}</span>
        </div>

        <ChevronDown
          className={`w-[35px] h-[35px] justify-self-end group-hover:text-orange-500 el__flow ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        className={`w-full grid grid-cols-2 el__flow ${
          isOpen
            ? "max-h-[700px] opacity-100 pointer-events-auto py-2"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        {sorter.fields.map((el, i) => (
          <RadioInput
            key={el.id}
            {...{
              el,
              register,
              currSorter: sorter.field,
              currVals: watch(sorter.field),
              handleChange,
              customStyle: i === 0 ? "" : "",
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default SorterField;
