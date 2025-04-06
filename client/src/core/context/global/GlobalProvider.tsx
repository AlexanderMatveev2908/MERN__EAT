import { FC, ReactElement, ReactNode } from "react";
import { GlobalContext } from "./GlobalContext";
import { useRootVals } from "../root/useRootVals";

type PropsType = {
  children: ReactNode | ReactNode[];
};

const GlobalProvider: FC<PropsType> = ({ children }): ReactElement => {
  return (
    <GlobalContext.Provider value={{ ...useRootVals() }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
