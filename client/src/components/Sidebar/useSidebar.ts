import { useEffect } from "react";

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

  const generateCodeVerifier = () => {
    const arrBytes = new Uint8Array(32);
    window.crypto.getRandomValues(arrBytes);
    return btoa(String.fromCharCode(...arrBytes))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };

  const generateCodeChallenge = async (codeVerifier: string) => {
    const encoder = new TextEncoder();
    const arrBytes = encoder.encode(codeVerifier);
    const hashedBuffer = await window.crypto.subtle.digest("SHA-256", arrBytes);
    const hashedArr = Array.from(new Uint8Array(hashedBuffer));
    return btoa(String.fromCharCode(...hashedArr))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };

  const handleLogin = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    sessionStorage.setItem("codeVerifier", codeVerifier);

    const params = new URLSearchParams({
      response_type: "code",
      client_id:
        import.meta.env.VITE_NODE_ENV === "development"
          ? import.meta.env.VITE_AUTH0_CLIENT_ID_DEV!
          : import.meta.env.VITE_AUTH0_CLIENT_ID!,
      redirect_uri:
        import.meta.env.VITE_NODE_ENV! === "development"
          ? import.meta.env.VITE_AUTH0_CALLBACK_URL_DEV!
          : import.meta.env.VITE_AUTH0_CALLBACK_URL!,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      audience:
        import.meta.env.VITE_NODE_ENV === "development"
          ? import.meta.env.VITE_AUTH0_AUDIENCE_DEV!
          : import.meta.env.VITE_AUTH0_AUDIENCE!,
      scope: "openid profile email offline_access ",
    });

    window.location.assign(
      `https://${import.meta.env.VITE_AUTH0_DOMAIN!}/authorize?${params + ""}`
    );
  };

  const handleLogout = () => {};

  return {
    handleLogin,
  };
};
