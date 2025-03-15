import { REG_EST_TIME, REG_OPEN_CLOSE_TIME } from "../constants/regex.js";
export const formatTimeHmMh = (val) => {
    if (!REG_EST_TIME.test(val + ""))
        return "00:00";
    const hours = Math.floor(val / 60);
    const minutes = val % 60;
    return `${(hours + "").padStart(2, "0")}:${(minutes + "").padStart(2, "0")}`;
};
export const reverseFormaTimeHhMm = (val) => {
    if (!val || !REG_OPEN_CLOSE_TIME.test(val))
        return 0;
    const [hours, minutes] = val.split(":").map((el) => +el);
    return hours * 60 + minutes;
};
export const getDiffTime = (closeVal, openVal) => (reverseFormaTimeHhMm(closeVal) - reverseFormaTimeHhMm(openVal)) / 60;
