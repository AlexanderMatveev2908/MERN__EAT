import { useState } from "react";
import { REG_PWD } from "../../../../constants/regex";

export const useGeneratePwd = () => {
  const [strongPwd, setStrongPwd] = useState<string>("");

  const getRandomVals = () => {
    const charSet =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]";
    const arrBytes = new Uint8Array(16);
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

  return {
    generatePwd,
    strongPwd,
    handleCopyPwd,
  };
};
