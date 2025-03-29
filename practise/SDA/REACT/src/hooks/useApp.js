import { useEffect, useRef, useState } from "react";
import { operations } from "../config/fields";
import { REG_OP } from "../config/reg";

const formatTxt = (txt) =>
  txt.replaceAll("×", "*").replaceAll("÷", "/").replaceAll("%", "/100*");

export const useApp = () => {
  const [textUser, setTextUser] = useState("0");
  const [resMath, setResMath] = useState(null);
  const resRef = useRef(null);

  const [totDev, setTotDev] = useState(0);

  useEffect(() => {
    const listenMouseDown = (e) => {
      if (!resRef?.current) return;
      if (!resRef.current.contains(e.target)) {
        setResMath(null);
      }
    };

    document.addEventListener("mousedown", listenMouseDown);
    return () => document.removeEventListener("mousedown", listenMouseDown);
  }, []);

  useEffect(() => {
    const updateTotDev = () => {
      if (isNaN(textUser.split("").at(-1))) return;
      const formatted = formatTxt(textUser);

      try {
        const res = new Function(`return ${formatted}`)();

        setTotDev(res);
      } catch (err) {
        console.log(err);
      }
    };

    updateTotDev();
  }, [textUser]);

  const handleToggleLastNum = () => {
    if (isNaN(textUser.split("").at(-1)) || textUser.length < 2) return;
    // i do not affect original array cause virtual DOM react is not triggered by changes that does not return new memory ref of var

    setTextUser((prev) => {
      let lastNum = [];
      const splitted = prev.split("");

      // start from bottom
      let i = splitted.length - 1;
      let lastOp = null;
      do {
        // recreate num
        if (!operations.includes(splitted[i])) lastNum.push(splitted[i]);
        // at op stop
        else {
          lastOp = splitted[i];
          break;
        }

        i--;
      } while (i >= 0);

      //  remake of number correct order
      lastNum = +lastNum.reverse().join("");
      // start processing
      if (lastOp === "+") {
        lastOp = "-";
      } else if (lastOp === "-") {
        lastOp = "+";
      } else {
        lastNum = -lastNum;
      }
      // start from prev str to calc logic, (splitted.len - 1 -i )tell us where was operator cause
      // splitted.length -1 allow us to think in index logic and -i tells position whew we stopped above
      //  - 1 cause we will replace operator with  updated one or same one(if no need change)
      const whereToCut = prev.length - (splitted.length - 1 - i) - 1;
      const cutted = prev.slice(0, whereToCut);
      if (operations.includes(cutted.split("").at(-1)) && lastOp === "+")
        lastOp = "";

      // no need to use lastNum +"" cause it automatically is converted to string, i use to write it anyway cause help me with a personal logic
      return cutted + lastOp + lastNum + "";
    });
  };

  const handleChainStr = (val) => {
    setTextUser((prev) => {
      if (prev === "Error") prev = "";

      const lastIndex = prev.length - 1;
      const lastChar = prev?.slice(lastIndex);
      // switch operations
      if (operations.includes(lastChar) && operations.includes(val))
        return prev.slice(0, lastIndex) + val;
      // replace placeholder
      if (prev === "0") return isNaN(+val) ? prev + val : val;

      // not allow two . or in general NaN val consecutive
      const lastBlock = prev.split(REG_OP).pop();

      if (lastBlock.includes(".") && val === ".") return prev;
      if (isNaN(+lastChar) && isNaN(+val)) return prev;

      return prev + val;
    });
  };

  const handleClear = () => {
    setTextUser("0");
    setResMath(null);
  };

  const handleShowRes = () => {
    if (isNaN(+textUser.slice(textUser.length - 1))) return;

    const formatted = formatTxt(textUser);

    const checkFormatted = formatted.split("");
    let i = 0;
    let isErr = false;
    do {
      if (checkFormatted[i] === "/") {
        // if we know is not by zero is ok
        if (checkFormatted[i + 1] !== "0") {
          i++;
          continue;
        }

        //  delete / cause would create errors in findIndex
        const blockToCheck = checkFormatted.slice(i + 1);
        // isolate from next op
        const nextOp = blockToCheck.findIndex((el) => operations.includes(el));
        // create final block to check
        const blockLoop =
          nextOp !== -1 ? blockToCheck.slice(0, nextOp) : blockToCheck;

        const num = blockLoop.join("");
        // or is zero or does not include floating prime number then is err
        if (num === "0" || !blockLoop.some((el) => !["0", "."].includes(el))) {
          isErr = true;
          break;
        }
      }
      i++;
    } while (i < checkFormatted.length);

    if (isErr) {
      alert("Error");
      setResMath(null);
      setTextUser("Error");
      return;
    }

    try {
      const res = new Function(`return ${formatted}`)();
      setResMath(res);
      setTextUser(res + "");
    } catch (err) {
      console.log(err);
    }
  };

  return {
    resMath,
    textUser,
    handleShowRes,
    handleClear,
    handleChainStr,
    resRef,
    totDev,
    handleToggleLastNum,
  };
};
