import { FC, ReactElement, ReactNode } from "react";
import { GlobalContext } from "./GlobalContext";
import { useRootVals } from "../root/useRootVals";
import { loadStripe } from "@stripe/stripe-js";

type PropsType = {
  children: ReactNode | ReactNode[];
};

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY!);

const GlobalProvider: FC<PropsType> = ({ children }): ReactElement => {
  return (
    <GlobalContext.Provider value={{ ...useRootVals(), stripePromise }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
