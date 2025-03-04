/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserProfileFormType } from "./types";

export const getRespectiveVals = (
  currFieldsArea: any[],
  user: UserProfileFormType["user"]
) => {
  let obj;

  Object.keys(user).forEach((key) => {
    if ([...currFieldsArea.map((el) => el.field)].includes(key))
      obj = { ...obj, [key]: user[key as keyof typeof user] };
  });

  return obj;
};

export const getRespectiveVals_2 = (
  currFieldsArea: any[],
  user: UserProfileFormType["user"]
) => {
  let respectiveVals;

  for (const key in user) {
    if (key === "errs") continue;

    if (currFieldsArea.map((field) => field.field).includes(key)) {
      respectiveVals = {
        ...respectiveVals,
        [key]: user[key as keyof typeof user],
      };
    }
  }

  return respectiveVals;
};

export const validateVals = (
  respectiveVals: { [key: string]: string },
  currArea: any[]
) => {
  let isCurrFormValid = true;

  for (let i = 0; i < currArea.length; i++) {
    const currReg = currArea[i].reg;

    if (!currReg.test(respectiveVals[currArea[i].field])) {
      console.log(respectiveVals[currArea[i].field]);
      isCurrFormValid = false;
    }
  }

  return isCurrFormValid;
};
