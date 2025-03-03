import { useQuery } from "@tanstack/react-query";
import { useUser } from "./useGlobal";
import { useCallback, useEffect } from "react";
import { useHandleErr } from "./useHandleErr";
import { getUserInfoAPI } from "../api/user";
import { getInitialsName } from "../utils/getInitialsName";

export const useApp = () => {
  const { setCurrUser, isLogged } = useUser();
  const { handleErrAPI } = useHandleErr();

  const memoGetInfoAPI = useCallback(async () => await getUserInfoAPI(), []);

  const { data, isSuccess, isError, error } = useQuery({
    queryKey: ["user", isLogged],
    queryFn: memoGetInfoAPI,
    enabled: isLogged,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const handleSIdeEffects = () => {
      if (isError) {
        handleErrAPI({ err: error, toast: false });
        setCurrUser(null);
      } else if (isSuccess) {
        console.log(data);
        setCurrUser(data.user);
        if (!sessionStorage.getItem("initName"))
          sessionStorage.setItem("initName", getInitialsName(data.user));
      }
    };

    handleSIdeEffects();
    // eslint-disable-next-line
  }, [isError, isSuccess]);

  useEffect(() => {
    if (!isLogged) {
      setCurrUser(null);
      sessionStorage.removeItem("initName");
    }
    // eslint-disable-next-line
  }, [isLogged]);
};
