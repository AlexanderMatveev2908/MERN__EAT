import { FC, ReactElement, ReactNode } from "react";
import { GlobalContext } from "./GlobalContext";
import { useRootVals } from "../root/useRootVals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type PropsType = {
  children: ReactNode | ReactNode[];
};

const queryClient = new QueryClient();

const GlobalProvider: FC<PropsType> = ({ children }): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider
        value={{
          ...useRootVals(),
        }}
      >
        {children}
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
};
export default GlobalProvider;
