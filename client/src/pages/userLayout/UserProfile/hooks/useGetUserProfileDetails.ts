import { useQuery } from "@tanstack/react-query";
import { getUserProfileDetailsAPI } from "../../../../api/user";

export const useGetUserProfileDetails = () => {
  const {
    data: fetchedUserData,
    isPending,
    isError,
    isSuccess,
    error,
  } = useQuery({
    queryKey: ["userProfileDetails"],
    queryFn: getUserProfileDetailsAPI,
  });

  return { fetchedUserData, isPending, isSuccess, isError, error };
};
