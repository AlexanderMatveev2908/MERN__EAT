/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { REG_PWD } from "../../../../constants/regex";

export const useGeneratePwd = () => {
  const [strongPwd, setStrongPwd] = useState<string>("");
  const [isCopyingTooltip, setIsCopyingTooltip] = useState(false);

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

  const handlePwdBtn = () => {
    generatePwd();
  };

  const handleCopyBnt = () => {
    handleCopyPwd();

    setIsCopyingTooltip(false);

    setTimeout(() => {
      setIsCopyingTooltip(true);
      setTimeout(() => {
        setIsCopyingTooltip(false);
      }, 600);
    }, 0);
  };

  return {
    handlePwdBtn,
    handleCopyBnt,
    isCopyingTooltip,
    strongPwd,
  };
};
