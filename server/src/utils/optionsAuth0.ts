export const makeOptAuth0 = (code: string, codeVerifier: string) => ({
  grant_type: "authorization_code",
  client_id:
    process.env.NODE_ENV === "development"
      ? process.env.AUTH0_CLIENT_ID_DEV!
      : process.env.AUTH0_CLIENT_ID!,
  client_secret:
    process.env.NODE_ENV === "development"
      ? process.env.AUTH0_CLIENT_SECRET_DEV!
      : process.env.AUTH0_CLIENT_SECRET!,
  code,
  code_verifier: codeVerifier,
  redirect_uri:
    process.env.NODE_ENV === "development"
      ? process.env.AUTH0_REDIRECT_URL_DEV!
      : process.env.AUTH0_REDIRECT_URL!,
  audience:
    process.env.NODE_ENV === "development"
      ? process.env.AUTH0_AUDIENCE_DEV!
      : process.env.AUTH0_AUDIENCE!,
});
