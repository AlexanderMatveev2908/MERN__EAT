// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { tokenExchangeAPI } from "../../api/auth/authAPI";
// import { useCallback, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const useCallbackAuth = () => {
//   const navigate = useNavigate();

//   const sendDataTokenExchange = useCallback(async () => {
//     const searchParams = new URLSearchParams(window.location.search);

//     const code = searchParams.get("code");
//     const codeVerifier = sessionStorage.getItem("codeVerifier");

//     try {
//       if (!code || !codeVerifier)
//         throw new Error("Code or codeVerifier not found");

//       const data = await tokenExchangeAPI(code, codeVerifier);

//       sessionStorage.removeItem("codeVerifier");
//       sessionStorage.setItem("accessToken", data.accessToken);

//       navigate("/user-profile");
//     } catch (err: any) {
//       console.log(err);
//     }
//   }, [navigate]);

//   useEffect(() => {
//     sendDataTokenExchange();
//   }, [sendDataTokenExchange]);
// };
