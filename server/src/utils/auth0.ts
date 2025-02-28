export const makeOptAuth0Login = (code: string, codeVerifier: string) =>
  new URLSearchParams({
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

export const makeOptAuth0Logout = (refreshToken: string) =>
  new URLSearchParams({
    client_id:
      process.env.NODE_ENV === "development"
        ? process.env.AUTH0_CLIENT_ID_DEV!
        : process.env.AUTH0_CLIENT_ID!,
    client_secret:
      process.env.NODE_ENV === "development"
        ? process.env.AUTH0_CLIENT_SECRET_DEV!
        : process.env.AUTH0_CLIENT_SECRET!,
    token: refreshToken,
  }).toString();

export const makeOptAuth0Refresh = (refreshToken: string) =>
  new URLSearchParams({
    client_id:
      process.env.NODE_ENV === "development"
        ? process.env.AUTH0_CLIENT_ID_DEV!
        : process.env.AUTH0_CLIENT_ID!,
    client_secret:
      process.env.NODE_ENV === "development"
        ? process.env.AUTH0_CLIENT_SECRET_DEV!
        : process.env.AUTH0_CLIENT_SECRET!,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });
