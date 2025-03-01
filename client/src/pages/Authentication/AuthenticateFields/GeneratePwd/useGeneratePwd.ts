/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { REG_PWD } from "../../../../constants/regex";

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

  const getRandomVals = () => {
    const charSet =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]";
    const arrBytes = new Uint8Array(24);
    window.crypto.getRandomValues(arrBytes);

    return Array.from(arrBytes, (el) => charSet[el % charSet.length]).join("");
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
      } catch (err: any) {
        console.log(err);
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
