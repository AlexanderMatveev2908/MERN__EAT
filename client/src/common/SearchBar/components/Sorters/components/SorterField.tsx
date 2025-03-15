import { FC } from "react";
import { SorterFieldType } from "../../../../../config/fieldsArr/MyRestaurants/filterSort";
import { UseFormReturn } from "react-hook-form";
import SubSorterField from "./components/SubSorterField";

type PropsType = {
  sorter: SorterFieldType;
  formContext: UseFormReturn;
};

const SorterField: FC<PropsType> = ({ formContext, sorter }) => {
  const { register, watch, setValue } = formContext;

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
      <div className="w-full flex items-center gap-5 group">
        {<sorter.icon className="min-w-[30px] min-h-[30px]" />}

        <span className="txt__02">{sorter.label}</span>
      </div>

      <div className="w-full grid grid-cols-2">
        {sorter.fields.map((el) => (
          <SubSorterField
            key={el.id}
            {...{
              el,
              register,
              currSorter: sorter.field,
              currVals: watch(sorter.field),
              handleChange,
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default SorterField;
