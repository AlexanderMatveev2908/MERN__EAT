export const formatTimeRange = (val: string) => {
  const hours = Math.floor(+val / 60);
  const minutes = +val % 60;

  return `${(hours + "").padStart(2, "0")}: ${(minutes + "").padStart(2, "0")}`;
};
