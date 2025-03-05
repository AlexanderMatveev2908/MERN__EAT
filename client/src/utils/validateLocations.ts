export const validateUserLocation = (
  fromArr: string[],
  queryArr: string[],
  from: string,
  query: string | null
) => fromArr.includes(from) && queryArr.includes(query ?? "");
