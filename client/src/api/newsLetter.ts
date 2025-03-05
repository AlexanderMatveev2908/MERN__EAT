import { foodAppInstance } from "../constants/axiosInstance";

export const newsLetterSubscribeAPI = async ({
  type,
}: {
  type: "subscribe" | "unsubscribe";
}) => {
  const { data } = await foodAppInstance.patch("/newsletter/", { type });

  return data;
};
