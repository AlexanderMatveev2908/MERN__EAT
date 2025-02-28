/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendCodeAuthAPI } from "../../api/auth/authAPI";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useCallbackAuth = () => {
  const navigate = useNavigate();

  const sendCodeBackend = useCallback(async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    try {
      if (!code) throw new Error("Code not found");

      const codeVerifier = sessionStorage.getItem("codeVerifier");

      if (!codeVerifier) throw new Error("Code verifier not found");

      const data = await sendCodeAuthAPI(code, codeVerifier);

      sessionStorage.removeItem("codeVerifier");
      sessionStorage.setItem("accessToken", data.accessToken);

      navigate("/user-profile");

      console.log(data);
    } catch (err: any) {
      console.log(err);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    sendCodeBackend();
    // eslint-disable-next-line
  }, []);
};
