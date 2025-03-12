import { useQuery } from "@tanstack/react-query";

export const useMyRestaurants = () => {
  const { data, isPending, isSuccess, isError, error } = useQuery({});
};
