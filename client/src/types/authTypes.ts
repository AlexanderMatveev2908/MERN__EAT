export type BaseResAPIType = Promise<{
  msg: string;
  success: boolean;
}>;

export type AccessResAPIType = BaseResAPIType & {
  userEmail: string;
  accessToken: string;
};

export type VerifyAPI = {
  token: string;
  userId: string;
};
