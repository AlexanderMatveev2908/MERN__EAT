export const allowedFromAuthEmail = ["/auth/register", "/auth/login"];
export const allowedFromAuthType = ["recover-pwd", "verify-account"];

export const unSubscribeNewsLetterAllowedUserType = ["non-logged", "logged"];

export const allowedUsersNoticeEmailFrom = [
  ...allowedFromAuthEmail,
  "/newsletter/notice-unsubscribe-with-retry",
  "/user/manage-account",
];

export const allowedUsersNoticeEmailType = [
  "verify-account",
  "recover-pwd",
  "sentEmailUnsubscribe",
  "change-email",
  "change-pwd",
];
