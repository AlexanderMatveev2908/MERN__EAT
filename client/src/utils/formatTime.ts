const getHoursAndMin = (val) => {
  const hours = Math.floor(+val / 60);
  const minutes = +val % 60;

  return { hours, minutes };
};

export const formatTimeRangeHhMm = (val: string) => {
  const { hours, minutes } = getHoursAndMin(val);

  return `${(hours + "").padStart(2, "0")}:${(minutes + "").padStart(2, "0")}`;
};

export const reverseFormaTimeHhMm = (val: string) => {
  const [hours, minutes] = val.split(":").map((el) => +el);

  return hours * 60 + minutes;
};

export const getDiffTime = (closeVal: string, openVal: string) =>
  +closeVal / 60 - +openVal / 60;
