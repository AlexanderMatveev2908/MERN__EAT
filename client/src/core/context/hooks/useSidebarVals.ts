import { useState } from "react";

export const useSidebarVals = () => {
  const [isOpenSide, setIsOpenSide] = useState(false);

  return {
    isOpenSide,
    setIsOpenSide,
  };
};
