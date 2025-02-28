import { useEffect } from "react";
import {
  generateCodeChallenge,
  generateCodeVerifier,
  makeParamsAuth0Login,
} from "../../utils/auth0";
import { useMutation } from "@tanstack/react-query";
import { logoutUserAPI } from "../../api/auth/authAPI";

export const useSidebar = ({
  sideRef,
  setSideOpen,
}: {
  sideRef: React.MutableRefObject<HTMLDivElement | null>;
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    const closeSide = (e: MouseEvent) => {
      if (!sideRef.current?.contains(e.target as Node)) {
        setSideOpen(false);
      }
    };

    document.addEventListener("mousedown", closeSide);

    return () => {
      document.removeEventListener("mousedown", closeSide);
    };
  }, [setSideOpen, sideRef]);

  const handleLogin = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    sessionStorage.setItem("codeVerifier", codeVerifier);

    window.location.assign(
      `https://${import.meta.env.VITE_AUTH0_DOMAIN!}/authorize?${
        makeParamsAuth0Login(codeChallenge) + ""
      }`
    );
  };

  const {
    data: dataLogout,
    isPending: isPendingLogout,
    mutate: mutateLogout,
  } = useMutation<{ success: true }>({
    mutationFn: logoutUserAPI,
    onSuccess: (data) => {
      sessionStorage.removeItem("accessToken");

      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogout = () => {
    console.log("run");
    mutateLogout();
  };

  return {
    handleLogin,
    handleLogout,
  };
};
