import { createContext } from "react";
import { RootValsType } from "../root/rootTypes";

export const GlobalContext = createContext<RootValsType | null>(null);
