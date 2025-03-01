import { useEffect, useRef, useState } from "react";
import { REG_PWD } from "../../../../constants/regex";
import { tailwindBreak } from "../../../../constants/breakpoints";

export const useGeneratePwd = () => {
  const genRef = useRef<HTMLButtonElement | null>(null);
  const [strongPwd, setStrongPwd] = useState<string>("");
  const [isGeneratePwdTooltip, setIsGeneratePwdTooltip] = useState(false);
  const [isCopyingTooltip, setIsCopyingTooltip] = useState(false);

  useEffect(() => {
    const handleToolRef = (e: MouseEvent) => {
      if (genRef.current && !genRef.current?.contains(e.target as Node))
        setIsGeneratePwdTooltip(false);
    };

    document.addEventListener("mousedown", handleToolRef);

    return () => document.removeEventListener("mousedown", handleToolRef);
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

  const handleCopyPwd = () => {
    if (strongPwd) navigator.clipboard.writeText(strongPwd);
  };

  const handlePwdBtn = () => {
    generatePwd();
    if (window.innerWidth < tailwindBreak.md) {
      setIsGeneratePwdTooltip(!isGeneratePwdTooltip);
      setTimeout(() => setIsGeneratePwdTooltip(false), 750);
    }
  };

  const handleCopyBnt = () => {
    handleCopyPwd();
    if (window.innerWidth < tailwindBreak.md) {
      setIsCopyingTooltip(true);
      setTimeout(() => setIsCopyingTooltip(false), 750);
    }
  };

  return {
    handlePwdBtn,
    handleCopyBnt,
    isGeneratePwdTooltip,
    isCopyingTooltip,
    strongPwd,
    genRef,
  };
};
