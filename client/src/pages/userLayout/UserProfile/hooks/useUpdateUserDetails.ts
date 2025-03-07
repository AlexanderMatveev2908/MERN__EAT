import { useMutation } from "@tanstack/react-query";
import { UserDataFormType } from "./UseProfileReducer/types/types";
import { updateUserProfileAPI } from "../../../../api/user";

export const useUpdateUserDetails = () => {
  const {
    mutate: mutateUpdate,
    data: dataUpdate,
    isPending: isPendingUpdate,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
  } = useMutation({
    mutationFn: (params: UserDataFormType) => updateUserProfileAPI(params),
  });

  return {
    dataUpdate,
    isPendingUpdate,
    isSuccessUpdate,
    isErrorUpdate,
    errorUpdate,
    mutateUpdate,
  };
};
