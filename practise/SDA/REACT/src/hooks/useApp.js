import { useEffect, useRef, useState } from "react";
import { operations } from "../config/fields";

export const useApp = () => {
  const [textUser, setTextUser] = useState("0");
  const [resMath, setResMath] = useState(null);
  const resRef = useRef(null);

  useEffect(() => {
    const listenKey = (e) => {
      if (!resRef?.current) return;

      if (!resRef.current.contains(e.target)) {
        setResMath(null);
      }
    };

    document.addEventListener("mousedown", listenKey);

    return () => document.removeEventListener("mousedown", listenKey);
  }, []);

  const handleChainStr = (val) => {
    setTextUser((prev) => {
      const lastIndex = prev.length - 1;
      const lastChar = prev.slice(lastIndex);
      // switch operations
      if (operations.includes(lastChar) && operations.includes(val))
        return prev.slice(0, lastIndex) + val;
      // replace placeholder
      if (prev === "0") return !isNaN(val) ? val : prev;

      // not allow two . or in general NaN val consecutive for no sense
      const lastBlock = prev.split(/[+\-×÷]/).pop();

      if (lastBlock.includes(".") && val === ".") return prev;
      if (isNaN(lastChar) && isNaN(val)) return prev;

      return prev + val;
    });
  };

  const handleClear = () => {
    setTextUser("0");
    setResMath(null);
  };

  const handleShowRes = () => {
    let formatted = textUser.replaceAll("×", "*");
    formatted = formatted.replaceAll("÷", "/");

    setResMath(eval(formatted));
    setTextUser(eval(formatted) + "");
  };

  return {
    resMath,
    textUser,
    handleShowRes,
    handleClear,
    handleChainStr,
    resRef,
  };
};
