/* eslint-disable @typescript-eslint/no-explicit-any */
export const destructureDataAPI = async (cbAPI: () => Promise<any>) => {
  const { data } = await cbAPI();

  return data;
};
