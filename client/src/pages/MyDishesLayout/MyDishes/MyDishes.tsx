import { FC } from "react";
import { useMyDishes } from "./useMyDishes";
import { FormProvider } from "react-hook-form";
import SearchBar from "../../../UI/common/SearchBar/SearchBar";
import { myDishesFieldsSearch } from "../../../core/config/fieldsArr/allFields/MyDishes/filterSort";

const MyDishes: FC = () => {
  const { formContextMyDishesSearch: formContext, handleSave } = useMyDishes();
  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-5">
      <span className="txt__04">My Dishes</span>

      <FormProvider {...formContext}>
        <SearchBar
          {...{
            handleSave,
            formContext,
            isPending: false,
            searchFields: myDishesFieldsSearch,
          }}
        />
      </FormProvider>
    </div>
  );
};
export default MyDishes;
