/* eslint-disable @typescript-eslint/no-explicit-any */

import { RestAdminState } from "../../types/restAdmin";

export const useRestAdminVals = (
  myRestState: RestAdminState,
  dispatch: React.Dispatch<any>
) => {
  return {
    ...myRestState,
  };
};
