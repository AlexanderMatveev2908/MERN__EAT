import { FC, useEffect, useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { DishMenuFormType } from "../../../types/types";
import RestaurantSelect from "./components/components/RestaurantSelect";
import { ReturnIdsAPI } from "../../../core/api/APICalls/myDishes";
import ButtonAnimated from "../../components/buttons/ButtonAnimated";
import ButtonBasic from "../../components/buttons/ButtonBasic";
import SubForm from "./components/SubForm";
import { myDishesFormItem } from "../../../core/config/fieldsArr/allFields/MyDishes/makeUpdate";

type PropsType = {
  formContext: UseFormReturn<DishMenuFormType>;
  handleSave: () => void;
  isPending: boolean;
  restInfo: ReturnIdsAPI[];
};
const MyDishesForm: FC<PropsType> = ({
  formContext,
  handleSave,
  isPending,
  restInfo,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const { control, watch } = formContext;

  const { fields, append } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    const subscription = watch((vals) => {
      const currFormVals = vals.items?.[fields.length - 1];

      let isInvalid = !currFormVals?.images?.length;

      for (const el of myDishesFormItem) {
        const currField = currFormVals?.[el.field];

        if (!el.reg.test(currField)) {
          isInvalid = true;
          break;
        }
      }

      setIsDisabled(isInvalid);
    });

    return () => subscription.unsubscribe();
  }, [fields, watch]);

  const handleAddForm = () => {
    append({
      name: "",
      price: "",
      quantity: "",
      images: [],
    });
  };

  return (
    <div className="w-full grid grid-cols-1 gap-5">
      <RestaurantSelect {...{ restInfo, formContext }} />

      {fields.map((_, indexForm) => (
        <SubForm key={indexForm} {...{ formContext, restInfo, indexForm }} />
      ))}

      <div className="w-full max-w-[250px] justify-self-center mt-5">
        <ButtonAnimated
          {...{
            label: "Create",
            type: "submit",
            handleClick: handleSave,
            isPending,
          }}
        />
      </div>

      <div className="w-full max-w-[200px] justify-self-start">
        <ButtonBasic
          {...{
            type: "button",
            label: "One more",
            handleClick: handleAddForm,
            isDisabled,
          }}
        />
      </div>
    </div>
  );
};
export default MyDishesForm;
