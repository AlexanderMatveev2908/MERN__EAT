import { FC, useEffect, useState } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { DishMenuFormType } from "../../../types/types";
import RestaurantSelect from "./components/components/RestaurantSelect";
import { ReturnIdsAPI } from "../../../core/api/APICalls/myDishes";
import SubForm from "./components/SubForm";
import { myDishesFormItem } from "../../../core/config/fieldsArr/allFields/MyDishes/makeUpdate";
import { useLocation } from "react-router-dom";
import ButtonAnimated from "../../components/buttons/ButtonAnimated";
import ButtonBasic from "../../components/buttons/ButtonBasic";

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
  const location = useLocation();

  const { control, watch } = formContext;
  const { fields, append, remove } = useFieldArray({
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

    setIsDisabled(true);
  };

  const removeForm = (indexForm: number) => {
    if (fields.length > 1) {
      remove(indexForm);
      setIsDisabled(false);
    }
  };

  return (
    <form className="w-full grid grid-cols-1 gap-5">
      <RestaurantSelect {...{ restInfo, formContext }} />

      {fields.map((_, indexForm) => (
        <SubForm
          key={indexForm}
          {...{ formContext, restInfo, indexForm, removeForm }}
        />
      ))}

      <div className="w-full max-w-[250px] justify-self-center justify-center flex mt-5">
        <ButtonAnimated
          {...{
            label:
              location.pathname === "/my-dishes/add-dish" ? "Create" : "Update",
            type: "submit",
            handleClick: handleSave,
            isPending,
          }}
        />
      </div>

      {/^\/(my-dishes)\/(add-dish)/.test(location.pathname) &&
        fields?.length < 20 && (
          <div className="w-full max-w-[150px] justify-self-start">
            <ButtonBasic
              {...{
                type: "button",
                label: "Add",
                styleTxt: "txt__02",
                handleClick: handleAddForm,
                isDisabled: isPending || isDisabled,
              }}
            />
          </div>
        )}
    </form>
  );
};
export default MyDishesForm;
