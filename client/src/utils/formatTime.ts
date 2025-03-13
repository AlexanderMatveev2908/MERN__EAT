export const reverseFormaTimeHhMm = (val: string) => {
  const [hours, minutes] = val.split(":").map((el) => +el);

  return hours * 60 + minutes;
};

export const getDiffTime = (closeVal: string, openVal: string) =>
  reverseFormaTimeHhMm(closeVal) / 60 - reverseFormaTimeHhMm(openVal) / 60;
