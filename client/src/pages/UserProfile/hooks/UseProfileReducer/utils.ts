/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserProfileFormType } from "./types";

export const getRespectiveVals = (
  arrFields: any[],
  user: UserProfileFormType["user"]
) => {
  let obj;

  Object.keys(user).forEach((key) => {
    if ([...arrFields.map((el) => el.field)].includes(key))
      obj = { ...obj, [key]: user[key as keyof typeof user] };
  });

  return obj;
};

export const validateVals = (
  respectiveVals: { [key: string]: string },
  currArea: any[]
) => {
  let isCurrFormValid = true;

  console.log(respectiveVals);
  console.log(currArea);

  for (let i = 0; i < currArea.length; i++) {
    const currReg = currArea[i].reg;

    if (!currReg.test(respectiveVals[currArea[i].field])) {
      console.log(respectiveVals[currArea[i].field]);
      isCurrFormValid = false;
    }
  }

  return isCurrFormValid;
};
