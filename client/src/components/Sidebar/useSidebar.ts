/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useToast, useUser } from "../../hooks/useGlobal";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logoutUserAPI } from "../../api/auth/authAPI";

export const useSidebar = ({
  sideRef,
  setSideOpen,
}: {
  sideRef: React.MutableRefObject<HTMLDivElement | null>;
  setSideOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { showToastMsg } = useToast();
  const { setUserLogged } = useUser();

  const navigate = useNavigate();

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

  const { mutate, isPending } = useMutation({
    mutationFn: () => logoutUserAPI(),
    onSuccess: () => {
      showToastMsg("Logout successful", "SUCCESS");
    },
    onError: (err: any) => {
      showToastMsg(err?.response?.data?.msg || err.message, "ERROR");
    },
    onSettled: () => {
      setUserLogged();
      navigate("/", { replace: true });
    },
  });

  const handleLogout = () => mutate();

  const handleSideClick = (path: string, from?: string) => {
    navigate(path, from ? { state: { from } } : undefined);
    setSideOpen(false);
  };

  return {
    isPending,
    handleLogout,
    handleSideClick,
  };
};

// const handleLogin = async () => {
//   const codeVerifier = generateCodeVerifier();
//   const codeChallenge = await generateCodeChallenge(codeVerifier);

//   sessionStorage.setItem("codeVerifier", codeVerifier);

//   window.location.assign(
//     `https://${import.meta.env
//       .VITE_AUTH0_DOMAIN!}/authorize?${makeParamsAuth0Login(codeChallenge)}`
//   );
// };

// const {
//   data: dataLogout,
//   isPending: isPendingLogout,
//   mutate: mutateLogout,
// } = useMutation<{ success: true }>({
//   mutationFn: logoutUserAPI,
//   onSuccess: () => {
//     sessionStorage.removeItem("accessToken");

//     window.location.assign(
//       `https://${
//         import.meta.env.VITE_AUTH0_DOMAIN
//       }/v2/logout?${makeParamsAuth0Logout()}`
//     );
//   },
//   onError: (error) => {
//   },
// });

// const handleLogout = () => {
//   mutateLogout();
// };
