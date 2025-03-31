/* eslint-disable @typescript-eslint/no-explicit-any */
export const destructureDataAPI = async (
  cbAPI: () => Promise<any>
): Promise<any> => {
  const { data } = await cbAPI();

  return data;
};

export const makeDelay = (cb: () => void) => {
  setTimeout(() => {
    cb();
  }, 250);
};
