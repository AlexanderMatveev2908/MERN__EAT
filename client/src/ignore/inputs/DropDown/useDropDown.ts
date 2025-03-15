// import { useEffect } from "react";

// export const useDropDown = ({
//   dropRef,
//   setIsDropOpen,
// }: {
//   dropRef: React.RefObject<HTMLDivElement | null>;
//   setIsDropOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {
//   useEffect(() => {
//     const focusDrop = (e: MouseEvent) =>
//       dropRef.current?.contains(e.target as Node)
//         ? dropRef.current?.focus()
//         : setIsDropOpen(false);

//     document.addEventListener("click", focusDrop);

//     return () => document.removeEventListener("click", focusDrop);
//   }, [dropRef, setIsDropOpen]);
// };
