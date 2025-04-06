// import { ChevronDown } from "lucide-react";
// import { FC, useRef, useState } from "react";
// import { useDropDown } from "./useDropDown";

// type PropsType = {
//   isAbsolute?: boolean;
// };

// const DropDown: FC<PropsType> = ({ isAbsolute = true }) => {
//   const dropRef = useRef<HTMLDivElement | null>(null);
//   const [isDropOpen, setIsDropOpen] = useState<boolean>(false);

//   useDropDown({ dropRef, setIsDropOpen });

//   return (
//     <div
//       className={` w-full flex h-fit flex-col ${isAbsolute ? "relative" : ""}`}
//     >
//       <div
//         tabIndex={1}
//         className={`w-full flex flex-col border-2 border-orange-500 bg-[#111] rounded-xl el__flow ${
//           isAbsolute ? "absolute" : ""
//         } ${isDropOpen ? "focus__base" : ""}`}
//       >
//         <div
//           ref={dropRef}
//           onClick={() => setIsDropOpen(!isDropOpen)}
//           className={`w-full flex justify-between items-center px-6 py-2 group cursor-pointer ${
//             isDropOpen ? "border-b-2 border-orange-500" : ""
//           }`}
//         >
//           <span className="txt__02 group-hover:text-orange-500 el__flow">
//             Select Something
//           </span>

//           <span className="w-fit flex justify-center items-center el__flow">
//             <ChevronDown
//               className={`${
//                 isDropOpen ? "rotate-180" : ""
//               } w-[40px] h-[40px] el__flow  group-hover:text-orange-500`}
//             />
//           </span>
//         </div>

//         <ul
//           className={`w-full flex flex-col el__flow ${
//             isDropOpen ? "max-h-[500px] pb-3" : "max-h-0"
//           }`}
//         >
//           {Array.from({ length: 6 }).map((_, i) => (
//             <li
//               className={`w-full px-5 py-3 border-b-2 border-orange-500 duration-300 last:border-b-0 last:pb-0 hover:text-orange-500 cursor-pointer transition-all bg-[#111] ${
//                 isDropOpen
//                   ? "opacity-100 pointer-events-auto"
//                   : "opacity-0 pointer-events-none"
//               }`}
//               key={i}
//             >
//               Option {i + 1}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };
// export default DropDown;
