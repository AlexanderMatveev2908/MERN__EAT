// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { FC, useState } from "react";
// import { UseFormReturn } from "react-hook-form";
// import CheckBox from "../../UI/forms/inputFields/CheckBox";
// import DropHandler from "../../UI/common/SearchBar/components/DropHandler";
// import { LuChefHat } from "react-icons/lu";
// import { CheckBoxFieldType } from "../../core/config/fieldsArr/allFields/MyRestaurants/makeUpdate";

// type PropsType = {
//   catFields: CheckBoxFieldType[];
//   formContext: UseFormReturn;
// };

// const CatQuery: FC<PropsType> = ({ formContext, catFields }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const { register, watch } = formContext;

//   return (
//     <div className="w-full grid grid-cols-1">
//       <DropHandler
//         {...{ isOpen, setIsOpen, txt: "Category", Icon: LuChefHat }}
//       />

//       <div
//         className={`w-full grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 transition-all duration-300 ${
//           isOpen
//             ? "max-h-[700px] opacity-100 pointer-events-auto py-3"
//             : "opacity-0 max-h-0 pointer-events-none"
//         }`}
//       >
//         {catFields.map((el) => (
//           <CheckBox
//             key={el.id}
//             {...({
//               register,
//               field: el,
//               valsChosen: watch("categories"),
//             } as any)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
// export default CatQuery;
