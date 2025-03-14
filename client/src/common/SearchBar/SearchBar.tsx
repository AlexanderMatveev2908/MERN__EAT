import { FC } from "react";
import { FieldQuerySortType } from "../../config/fieldsArr/MyRestaurants/filterSort";
import SearchField from "./components/SearchField";
import { UseFormReturn } from "react-hook-form";
import MoreQueries from "./components/MoreQueries/MoreQueries";

type PropsType = {
  searchFields: FieldQuerySortType[];
  formContext: UseFormReturn;
};

const SearchBar: FC<PropsType> = ({ searchFields, formContext }) => {
  const { register } = formContext;

  return (
    <div className="w-full max-w-[90%] border-[3px] border-orange-500 rounded-xl p-5">
      <div className="w-full grid grid-cols-1 gap-5">
        <SearchField {...{ register }} />

        <MoreQueries {...{ formContext, searchFields }} />
      </div>
    </div>
  );
};
export default SearchBar;
