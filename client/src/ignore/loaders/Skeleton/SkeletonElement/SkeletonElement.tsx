// import { Fragment } from "react/jsx-runtime";

// const SkeletonElement = () => {
//   return (
//     <div className="w-full grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
//       {Array.from({ length: 5 }).map((_, i) => (
//         <Fragment key={i}>
//           <div className="w-full hidden lg:block h-[200px] rounded-xl bg-neutral-900 skeleton__el"></div>
//           <div
//             className="w-full hidden lg:block h-[200px] skeleton__el rounded-xl
//         "
//           ></div>
//         </Fragment>
//       ))}

//       {Array.from({ length: 5 }).map((_, i) => (
//         <div
//           key={i}
//           className="w-full lg:hidden rounded-xl grid grid-cols-1 gap-y-5"
//         >
//           <div className="w-full h-[50px] bg-neutral-900 rounded-xl skeleton__el"></div>

//           <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-10 gap-y-5 justify-items-center">
//             {Array.from({ length: 2 }).map((_, i) => (
//               <div
//                 key={i}
//                 className="w-3/4 bg-neutral-900 rounded-xl h-[75px] sm:h-[150px] skeleton__el"
//               ></div>
//             ))}
//           </div>

//           <div className="w-full grid grid-cols-1 justify-items-center">
//             <div className="w-1/2 h-[40px] bg-neutral-900 rounded-xl skeleton__el"></div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default SkeletonElement;
