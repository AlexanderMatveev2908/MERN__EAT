import { foodAppInstance } from "../constants/axiosInstance";

export const newsLetterToggleLoggedAPI = async ({
  type,
}: {
  type: "subscribe" | "unsubscribe";
}) => {
  const { data } = await foodAppInstance.patch("/newsletter/toggle-logged", {
    type,
  });

  return data;
};

export const subscribeNonLoggedUserAPI = async (email: string) => {
  const { data } = await foodAppInstance.post(
    "/newsletter/subscribe-non-logged",
    {
      email,
    }
  );

  return data;
};

export const unSubScribeViaLinkLoggedAPI = async (params: {
  userId: string;
  token: string;
}) => {
  const { data } = await foodAppInstance.patch(
    "/newsletter/unsubscribe-via-link-logged",
    params
  );

  return data;
};

export const unSubscribeViaLinkNonLoggedAPI = async (params: {
  userId: string;
  token: string;
}) => {
  const { data } = await foodAppInstance.delete(
    "/newsletter/unsubscribe-via-link-non-logged",
    { data: params }
    // axios with no data key append params as query else as body
  );

  return data;
};

export const sendEmailUnsubscribeAPI = async ({
  email,
  path,
}: {
  email: string;
  path: string;
}) => {
  const { data } = await foodAppInstance.post(`/newsletter${path}`, { email });

  return data;
};
