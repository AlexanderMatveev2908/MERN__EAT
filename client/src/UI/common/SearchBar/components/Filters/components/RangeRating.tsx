import { UseFormReturn } from "react-hook-form";
import DropHandler from "../../DropHandler";
import { FC, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import CheckBox from "../../../../../forms/inputFields/CheckBox";
import { ratingRangeFields } from "../../../../../../core/config/fieldsArr/allFields/MyRestaurants/filterSort";

type PropsType = {
  formContext: UseFormReturn;
};

const RangeRating: FC<PropsType> = ({ formContext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, watch } = formContext;

  return (
    <div className="w-full grid grid-cols-1">
      <DropHandler
        {...{
          isOpen,
          setIsOpen,
          txt: "Avg rating",
          Icon: FaRegStar,
        }}
      />

      <div
        className={`w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]  gap-5 transition-all duration-300 ${
          isOpen
            ? "max-h-[700px] opacity-100 pointer-events-auto py-2"
            : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        {ratingRangeFields.map((el) => (
          <CheckBox
            key={el.id}
            {...{
              field: el,
              register,
              currCategory: "ratingRange",
              valsChosen: watch("ratingRange"),
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default RangeRating;
