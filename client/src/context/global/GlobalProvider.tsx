import { FC, ReactElement, ReactNode } from "react";
import { GlobalContext } from "./GlobalContext";
import { useRootVals } from "../root/useRootVals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type PropsType = {
  children: ReactNode | ReactNode[];
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const GlobalProvider: FC<PropsType> = ({ children }): ReactElement => {
  const {
    toastState: { showToastMsg, ...restVals },
  } = useRootVals();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider
        value={{ toastState: { ...restVals, showToastMsg } }}
      >
        {children}
      </GlobalContext.Provider>
    </QueryClientProvider>
  );
};
export default GlobalProvider;
