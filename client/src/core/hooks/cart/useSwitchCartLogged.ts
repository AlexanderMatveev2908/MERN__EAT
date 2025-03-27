/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { switchCartLoggedAPI } from "../../api/api";
import { useGetFavHooks } from "../useGetFavHooks";
import { useInfoPop } from "../useGlobal";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { InfoPopType } from "../../context/hooks/useInfoPopVals";
import { DishType } from "../../../types/types";

export const useSwitchCartLogged = ({ dish }: { dish: DishType }) => {
  const [dishIdNewRest, setDishIdNewRest] = useState<string | null>(null);

  useEffect(() => {
    console.log(dishIdNewRest);
  }, [dishIdNewRest]);

  const queryClient = useQueryClient();

  const { showToastMsg, handleErrAPI } = useGetFavHooks();
  const { setInfoPop } = useInfoPop();

  const { mutate } = useMutation({
    mutationFn: () => switchCartLoggedAPI({ dishId: dishIdNewRest as string }),

    onSuccess: () => {
      showToastMsg("Cart replaced", "SUCCESS");
      queryClient.resetQueries({ queryKey: ["myCart"] });
    },
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
    onSettled: () => setInfoPop(null),
  });

  const handleOpenInfoPop = () => {
    setDishIdNewRest(dish._id);

    setInfoPop({
      msg: "Do you prefer keeping existing cart or delete it and start new one ?",
      confirmActMsg: "Start new cart",
      cancelActMsg: "Keep existing cart",
      confirmActCb: () => {
        setInfoPop(
          (prev: InfoPopType) => ({ ...prev, isPendingConfirm: true } as any)
        );
        mutate();
      },
      cancelActCb: () => setInfoPop(null),
    });
  };

  return {
    handleOpenInfoPop,
  };
};
