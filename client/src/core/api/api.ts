export {
  changeEmailAPI,
  changeOldPwdAPI,
  deleteAccountAPI,
  getRightManageAccountAPI,
  getUserInfoAPI,
  getUserProfileDetailsAPI,
  updateUserProfileAPI,
  verifyNewEmailAPI,
} from "./APICalls/user";

export {
  newsLetterToggleLoggedAPI,
  sendEmailUnsubscribeAPI,
  subscribeNonLoggedUserAPI,
  unSubScribeViaLinkLoggedAPI,
  unSubscribeViaLinkNonLoggedAPI,
} from "./APICalls/newsLetter";

export {
  createRestaurantAPI,
  deleteRestaurantAPI,
  getInfoRestaurantAPI,
  getMyRestaurantsAPI,
  updateRestaurantAPI,
} from "./APICalls/myRestaurants";

export {
  changeRecoverPwdAPI,
  loginUserAPI,
  logoutUserAPI,
  recoverPwdAPI,
  refreshTokenAPI,
  registerUserAPI,
  sendUserEmailAPI,
  verifyAccountAPI,
} from "./APICalls/auth";
