export const formatTimeRange = (val: string) => {
  const hours = Math.floor(+val / 60);
  const minutes = +val % 60;

  return `${(hours + "").padStart(2, "0")}:${(minutes + "").padStart(2, "0")}`;
};

export const reverseFormaTime = (val: string) => {
  const [hours, minutes] = val.split(":").map((el) => +el);

  return hours * 60 + minutes;
};

export const getDiffTime = (val: string, val_2: string) =>
  +val / 60 - +val_2 / 60;
