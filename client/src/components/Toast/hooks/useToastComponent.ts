import { useEffect, useRef, useState } from "react";
import { useToast } from "../../../hooks/useGlobal";

export const useToastComponent = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [closeClicked, setCloseClicked] = useState<boolean>(false);
  const toastRef = useRef<HTMLDivElement | null>(null);

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
      if (isToast) setCloseClicked(true);
      if (timerRef.current) timerRef.current = null;
    };
  }, [closeToast, isToast]);

  useEffect(() => {
    if (toastRef.current) {
      toastRef.current.classList.remove("toast__container_after");

      requestAnimationFrame(() =>
        toastRef.current?.classList.add("toast__container_after")
      );
    }
  }, [isToast, closeToast]);

  return {
    isToast,
    toastRef,
    msg,
    type,
    closeToast,
    closeClicked,
    setCloseClicked,
  };
};
