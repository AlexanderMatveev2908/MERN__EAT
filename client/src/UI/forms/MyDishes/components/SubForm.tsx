import { UseFormReturn } from "react-hook-form";
import { DishMenuFormType } from "../../../../types/types";
import ImagesField from "./components/ImagesField";
import NameDish from "./components/NameDish";
import NumericFields from "./components/NumericFields";
import { FC } from "react";
import DeleteButton from "../../../components/buttons/DeleteButton";

type PropsType = {
  formContext: UseFormReturn<DishMenuFormType>;
  indexForm: number;
  removeForm: (indexForm: number) => void;
};

const SubForm: FC<PropsType> = ({ formContext, indexForm, removeForm }) => {
  return (
    <div className="w-full grid grid-cols-1 border-2 rounded-xl border-orange-500 p-5 py-8 gap-5 relative">
      {indexForm !== 0 && (
        <div className="justify-self-end sm:absolute top-5 right-5">
          <DeleteButton
            {...{ txt: "Remove", handleDelete: () => removeForm(indexForm) }}
          />
        </div>
      )}

      <NameDish {...{ formContext, indexForm }} />

      <ImagesField {...{ formContext, indexForm }} />

      <NumericFields {...{ formContext, indexForm }} />
    </div>
  );
};
export default SubForm;
