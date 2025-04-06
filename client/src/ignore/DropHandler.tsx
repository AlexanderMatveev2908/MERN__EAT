// import { ChevronDown } from "lucide-react";
// import { FC } from "react";

// type PropsType = {
//   isOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   label: string;
// };

// const DropHandler: FC<PropsType> = ({ isOpen, setIsOpen, label }) => {
//   return (
//     <div
//       onClick={() => setIsOpen(!isOpen)}
//       className="w-full flex justify-between border-b-2 border-orange-500 group cursor-pointer items-center px-3 py-1"
//     >
//       <span className="txt__02 el__flow group-hover:text-orange-500">
//         {label}
//       </span>

//       <ChevronDown
//         className={`min-w-[35px] min-h-[35px] el__flow group-hover:text-orange-500 ${
//           isOpen ? "rotate-180" : ""
//         }`}
//       />
//     </div>
//   );
// };
// export default DropHandler;
