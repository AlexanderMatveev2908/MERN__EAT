/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth0 } from "@auth0/auth0-react";
import { sendCodeAuthAPI } from "../../api/auth/authAPI";
import { useCallback, useEffect, useRef } from "react";

export const useCallbackAuth = () => {
  const { handleRedirectCallback } = useAuth0();
  const hasRan = useRef<boolean>(false);

  const sendCode = useCallback(async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    console.log(code);

    try {
      if (!code) throw new Error("Code not found");

      if (hasRan.current) return;

      hasRan.current = true;

      await handleRedirectCallback();
      await sendCodeAuthAPI(code);
    } catch (err: any) {
      console.log(err);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    sendCode();
    // eslint-disable-next-line
  }, []);
};
