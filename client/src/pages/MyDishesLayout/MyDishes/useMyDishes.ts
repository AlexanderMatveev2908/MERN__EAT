import { fieldsMyDishesForm } from "../../../core/config/fieldsArr/allFields/MyDishes/filterSort";
import { useFormsCustom } from "../../../core/hooks/useGlobal";
import { SearchMyDishesFormType } from "../../../types/allTypes/myDishes";
import { createURLParams } from "../../../utils/utils";

export const useMyDishes = () => {
  const { formContextMyDishesSearch } = useFormsCustom();

  const { setValue, getValues, handleSubmit } = formContextMyDishesSearch;

  const handleSave = handleSubmit((formDatHook) => {
    sessionStorage.setItem("myDishesForm", JSON.stringify(formDatHook));

    const dataToSend = createURLParams(formDatHook);

    console.log(formDatHook);
  });

  const handleClear = () => {
    sessionStorage.removeItem("myDishesForm");

    let i = 0;
    do {
      const currField = fieldsMyDishesForm[i];

      setValue(
        currField as keyof SearchMyDishesFormType,
        Array.isArray(getValues(currField as keyof SearchMyDishesFormType))
          ? []
          : currField === "searchVals"
          ? ["name"]
          : ""
      );
      i++;
    } while (i < fieldsMyDishesForm.length);
  };

  return {
    formContextMyDishesSearch,
    handleSave,
    handleClear,
  };
};
