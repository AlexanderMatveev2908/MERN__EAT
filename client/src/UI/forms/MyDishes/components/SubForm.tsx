import { UseFormReturn } from "react-hook-form";
import { DishMenuFormType } from "../../../../types/types";
import ImagesField from "./components/ImagesField";
import NameDish from "./components/NameDish";
import NumericFields from "./components/NumericFields";
import { FC } from "react";

type PropsType = {
  formContext: UseFormReturn<DishMenuFormType>;
  indexForm: number;
};

const SubForm: FC<PropsType> = ({ formContext, indexForm }) => {
  return (
    <div className="w-full grid grid-cols-1 border-2 rounded-xl border-orange-500 p-5 py-8 gap-5">
      <NameDish {...{ formContext, indexForm }} />

      <ImagesField {...{ formContext, indexForm }} />

      <NumericFields {...{ formContext, indexForm }} />
    </div>
  );
};
export default SubForm;
