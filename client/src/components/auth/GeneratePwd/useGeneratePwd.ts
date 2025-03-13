import { useEffect, useRef, useState } from "react";
import { REG_PWD } from "../../../config/constants/regex";

export const useGeneratePwd = () => {
  const [strongPwd, setStrongPwd] = useState<string>("");
  const tooltipRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const animateTooltip = (e: MouseEvent) => {
      if (tooltipRef.current) {
        if (tooltipRef.current?.contains(e.target as Node)) {
          const tooltip = document.getElementById("tooltip");
          tooltip?.classList.remove("generate_password__tooltip");

          requestAnimationFrame(() =>
            tooltip?.classList.add("generate_password__tooltip")
          );
        }
      }
    };

    document.addEventListener("click", animateTooltip);

    return () => document.removeEventListener("click", animateTooltip);
  }, []);

  const charSet = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]<>-+~/$\\|`;

  const fisherYatesShuffle = () => {
    const arrStr: string[] = charSet.split("");

    for (let i = arrStr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      //  we create a var that needs to be added 1 cause Math.random go from 0 to 0.99 and we need to include all possibilities, if number is too high will rounded

      [arrStr[i], arrStr[j]] = [arrStr[j], arrStr[i]];
      // inversion of vals where curr val become random val and random val become curr
    }

    return arrStr.join("");
  };

  const getRandomVals = () => {
    const arrBytes = new Uint8Array(24);
    window.crypto.getRandomValues(arrBytes);

    const charSetRandom = fisherYatesShuffle();

    return Array.from(
      arrBytes,
      (el) => charSetRandom[el % charSetRandom.length]
      // el % len cause there can not be a rest bigger than the value than has bee used to make a division
    ).join("");
  };

  const generatePwd = async () => {
    let pwd = "";

    while (!REG_PWD.test(pwd)) {
      pwd = await getRandomVals();
    }

    setStrongPwd(pwd);
  };

  const handleCopyPwd = async () => {
    if (strongPwd) {
      try {
        await navigator.clipboard.writeText(strongPwd);
      } catch {
        //
      }
    }
  };

  return {
    generatePwd,
    handleCopyPwd,
    strongPwd,
    tooltipRef,
  };
};
