import { useFormsCustom } from "../../../core/hooks/useGlobal";

export const useMyDishes = () => {
  const { formContextMyDishesSearch } = useFormsCustom();

  const handleSave = formContextMyDishesSearch.handleSubmit((formDatHook) =>
    console.log(formDatHook)
  );

  return {
    formContextMyDishesSearch,
    handleSave,
  };
};
