import { useEffect, useRef, useState } from "react";
import { useToast } from "../../hooks/useGlobal";

export const useToastComponent = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [closeClicked, setCloseClicked] = useState<boolean>(false);

  const { isToast, msg, type, closeToast } = useToast();

  useEffect(() => {
    let timer;
    if (isToast) {
      setCloseClicked(false);
      timer = setTimeout(() => {
        closeToast();
      }, 5000);
      timerRef.current = timer;
    }

    return () => {
      clearTimeout(timer);
      setCloseClicked(true);
      if (timerRef.current) timerRef.current = null;
    };
  }, [closeToast, isToast]);

  return {
    isToast,
    msg,
    type,
    closeToast,
    closeClicked,
    setCloseClicked,
  };
};
