import { foodAppInstance } from "../constants/axiosInstance";
import { ReturnAPIBasic, ReturnUserInfoAPIType } from "../types/API";

export const newsLetterToggleLoggedAPI = async ({
  type,
}: {
  type: "subscribe" | "unsubscribe";
}): Promise<ReturnAPIBasic & ReturnUserInfoAPIType> => {
  const { data } = await foodAppInstance.patch("/newsletter/toggle-logged", {
    type,
  });

  return data;
};

export const subscribeNonLoggedUserAPI = async (
  email: string
): Promise<ReturnAPIBasic> => {
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
}): Promise<ReturnAPIBasic> => {
  const { data } = await foodAppInstance.patch(
    "/newsletter/unsubscribe-via-link-logged",
    params
  );

  return data;
};

export const unSubscribeViaLinkNonLoggedAPI = async (params: {
  userId: string;
  token: string;
}): Promise<ReturnAPIBasic> => {
  const { data } = await foodAppInstance.delete(
    "/newsletter/unsubscribe-via-link-non-logged",
    { data: params }
    // axios with no data key append params as query else as body
  );

  return data;
};

export const sendEmailUnsubscribeAPI = async ({
  email,
}: {
  email: string;
}): Promise<ReturnAPIBasic> => {
  const { data } = await foodAppInstance.post(
    `/newsletter/send-email-unsubscribe`,
    { email }
  );

  return data;
};
