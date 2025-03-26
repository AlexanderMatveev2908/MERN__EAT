import { useEffect, useRef, useState } from "react";
import { useToast } from "../../../core/hooks/useGlobal";

export const useToastComponent = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const afterRef = useRef<HTMLDivElement | null>(null);

  const {
    isToast,
    msg,
    type,
    closeToast,
    toastClicked,
    setToastClicked,
    wasToast,
    setWasToast,
  } = useToast();

  useEffect(() => {
    const handleToastUI = () => {
      const toast = document.getElementById("toast");
      if (afterRef?.current && toast) {
        if (isToast) {
          toast.classList.remove("toast__no");
          toast.classList.remove("toast__active_out");
          afterRef.current.classList.remove("toast__container_after");

          requestAnimationFrame(() => {
            toast.classList.add("toast__active_in");
            afterRef?.current?.classList.add("toast__container_after");
          });

          if (timerRef.current) clearTimeout(timerRef.current);

          timerRef.current = setTimeout(() => {
            setToastClicked(true);
            closeToast();
            timerRef.current = null;
          }, 5000);
        } else {
          toast.classList.remove("toast__active_in");

          if (toastClicked) {
            toast.classList.remove("toast__no");
            requestAnimationFrame(() => {
              toast.classList.add("toast__active_out");
            });
          } else {
            toast.classList.add("toast__no");
          }
        }
      }
    };

    handleToastUI();
  }, [isToast, toastClicked, closeToast]);

  return {
    isToast,
    afterRef,
    msg,
    type,
    closeToast,
    setToastClicked,
  };
};
