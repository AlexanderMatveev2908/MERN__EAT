/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePopup, useToast } from "../../../core/hooks/useGlobal";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";

export const useCreateTanMyDishes = ({
  cbMutation,
  setSelected,
}: {
  cbMutation: (params: string[] | URLSearchParams) => Promise<void>;
  setSelected: (val: string[]) => void;
}) => {
  const queryClient = useQueryClient();

  const { popup, setPopup } = usePopup();
  const { showToastMsg } = useToast();
  const { handleErrAPI } = useHandleErr();

  const { mutate, isPending } = useMutation({
    mutationFn: (params: string[] | URLSearchParams) => {
      setPopup({
        ...popup,
        isPending: true,
      } as any);

      return cbMutation(params);
    },
    onSuccess: () => {
      showToastMsg("Dishes Deleted successfully", "SUCCESS");
      setSelected([]);
      queryClient.resetQueries({ queryKey: ["myDishesSearch"] });
    },
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
    onSettled: () => setPopup(null),
  });

  return { mutate, isPending };
};
