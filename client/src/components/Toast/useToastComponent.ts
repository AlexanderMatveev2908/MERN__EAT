import { useEffect, useRef } from "react";
import { useToast } from "../../hooks/useGlobal";

export const useToastComponent = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const { isToast, msg, type, showToastMsg, closeToast } = useToast();

  useEffect(() => {
    showToastMsg("This is a success message", "SUCCESS");
  }, [showToastMsg]);

  useEffect(() => {
    let timer;
    if (isToast) {
      timer = setTimeout(() => {
        closeToast();
      }, 5000);
      timerRef.current = timer;
    }

    return () => {
      clearTimeout(timer);
      if (timerRef.current) timerRef.current = null;
    };
  }, [closeToast, isToast]);

  return {
    isToast,
    msg,
    type,
    closeToast,
  };
};
