import { FC } from "react";
import { Auth0Provider } from "@auth0/auth0-react";

type PropsType = {
  children: React.ReactNode;
};

const Auth0ProviderComponent: FC<PropsType> = ({ children }) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectURL =
    import.meta.env.VITE_NODE_ENV === "development"
      ? import.meta.env.VITE_AUTH0_CALLBACK_URL_DEV
      : import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience =
    import.meta.env.VITE_NODE_ENV === "development"
      ? import.meta.env.VITE_AUTH0_AUDIENCE_DEV
      : import.meta.env.VITE_AUTH0_AUDIENCE;

  if ([domain, clientID, redirectURL, audience].some((el) => !el))
    throw new Error("Unable to start auth");

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientID}
      authorizationParams={{
        redirect_uri: redirectURL,
        scope:
          "openid profile email create:users read:users update:users delete:users",
        response_type: "code",
      }}
    >
      {children}
    </Auth0Provider>
  );
};
export default Auth0ProviderComponent;
