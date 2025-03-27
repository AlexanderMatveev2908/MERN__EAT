/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePopup } from "../../../core/hooks/useGlobal";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";

export const useCreateTanMyDishes = ({
  cbMutation,
  setSelected,
}: {
  cbMutation: () => Promise<void>;
  setSelected: (val: string[]) => void;
}) => {
  const queryClient = useQueryClient();

  const { popup, setPopup } = usePopup();
  const { showToastMsg, handleErrAPI } = useGetFavHooks();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      setPopup({
        ...popup,
        isPending: true,
      } as any);

      return cbMutation();
    },
    onSuccess: () => {
      showToastMsg("Dishes Deleted successfully", "SUCCESS");
      setSelected([]);
      queryClient.resetQueries({ queryKey: ["myDishesSearch"] });
    },
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
    onSettled: () => setPopup(null),
  });

  const handleDelete = () => mutate();

  return { handleDelete, isPending };
};
