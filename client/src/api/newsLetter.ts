import { foodAppInstance } from "../constants/axiosInstance";

export const newsLetterToggleLoggedAPI = async ({
  type,
}: {
  type: "subscribe" | "unsubscribe";
}) => {
  const { data } = await foodAppInstance.patch("/newsletter/logged", { type });

  return data;
};

export const subscribeNonLoggedUserAPI = async (email: string) => {
  const { data } = await foodAppInstance.post("/newsletter/not-logged", {
    email,
  });

  return data;
};
