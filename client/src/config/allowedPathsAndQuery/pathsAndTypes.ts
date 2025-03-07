export const emailAllowedFrom = [
  "/auth/register",
  "/auth/login",
  "/newsletter/notice-unsubscribe-with-retry",
];
export const emailAllowedType = ["recover-pwd", "verify-account"];
export const userTypeEmailAllowedType = ["logged", "non-logged"];

export const recoverPwdAllowedFrom = ["/auth/verify"];

export const unSubscribeNewsLetterAllowedUserType = ["non-logged", "logged"];
