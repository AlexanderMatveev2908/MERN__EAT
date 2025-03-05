// export const generateCodeVerifier = () => {
//   const arrBytes = new Uint8Array(32); // i make an arr of 32 zero
//   window.crypto.getRandomValues(arrBytes); // browser will give 32 random numbers between 0 and 255, i use browser cause i had problems with crypto-browserify
//   return btoa(String.fromCharCode(...arrBytes))
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");
//   // first each number val will be encoded in an ASCI char, then ASCI char will be encoded in base64 from which i need to remove +/= cause are key symbol in url
// };

// export const generateCodeChallenge = async (codeVerifier: string) => {
//   const encoder = new TextEncoder(); // create instance encoder so i can convert str to bytes arr
//   const arrBytes = encoder.encode(codeVerifier);
//   //  create var that keeps bytes raw arr vals
//   const hashedBuffer = await window.crypto.subtle.digest("SHA-256", arrBytes); // we await browser encryption to get a readonly low level arr buffer of 32 bytes
//   const hashedArr8 = new Uint8Array(hashedBuffer);
//   //  convert low level arr buffer to raw bytes arr
//   return btoa(String.fromCharCode(...hashedArr8))
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=+$/, "");
//   //  same as above in first func, we convert each hashed val of raw arr to ASCI and finally return a safe base64 str without key symbols
// };

// export const makeParamsAuth0Login = (codeChallenge: string) =>
//   new URLSearchParams({
//     response_type: "code",
//     client_id:
//       import.meta.env.VITE_NODE_ENV === "development"
//         ? import.meta.env.VITE_AUTH0_CLIENT_ID_DEV!
//         : import.meta.env.VITE_AUTH0_CLIENT_ID!,
//     redirect_uri:
//       import.meta.env.VITE_NODE_ENV! === "development"
//         ? import.meta.env.VITE_AUTH0_CALLBACK_URL_DEV!
//         : import.meta.env.VITE_AUTH0_CALLBACK_URL!,
//     code_challenge_method: "S256",
//     code_challenge: codeChallenge,
//     audience:
//       import.meta.env.VITE_NODE_ENV === "development"
//         ? import.meta.env.VITE_AUTH0_AUDIENCE_DEV!
//         : import.meta.env.VITE_AUTH0_AUDIENCE!,
//     scope: "openid profile email offline_access ",
//   }).toString();

// export const makeParamsAuth0Logout = () =>
//   new URLSearchParams({
//     client_id:
//       import.meta.env.VITE_NODE_ENV === "development"
//         ? import.meta.env.VITE_AUTH0_CLIENT_ID_DEV!
//         : import.meta.env.VITE_AUTH0_CLIENT_ID!,
//     returnTo:
//       import.meta.env.VITE_NODE_ENV === "development"
//         ? import.meta.env.VITE_AUTH0_LOGOUT_REDIRECT_DEV!
//         : import.meta.env.VITE_AUTH0_LOGOUT_REDIRECT!,
//   }).toString();
