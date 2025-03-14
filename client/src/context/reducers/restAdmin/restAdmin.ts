import { RestAdminState } from "../../../types/restAdmin";
import { RootActionTypes } from "../../root/rootTypes";

export const restAdmin = (
  myRestState: RestAdminState,
  action: RootActionTypes
) => {
  switch (action.type) {
    default:
      return myRestState;
  }
};
