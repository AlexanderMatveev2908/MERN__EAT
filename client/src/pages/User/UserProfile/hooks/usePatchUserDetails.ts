import { useMutation } from "@tanstack/react-query";

export const usePatchUserDetails = () => {
  const { data: freshedFetchedDetails, isPending } = useMutation({});
};
