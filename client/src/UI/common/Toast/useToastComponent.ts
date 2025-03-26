import { useEffect, useRef } from "react";
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
    // wasToast,
    // setWasToast,
  } = useToast();

  useEffect(() => {
    const handleToastUI = () => {
      const toast = document.getElementById("toast");
      if (afterRef?.current && toast) {
        //  i used a ref with react and a basic id to exercise with different cases
        if (isToast) {
          //  remove default position toast, animation out if preset and animation after if present
          toast.classList.remove("toast__no");
          toast.classList.remove("toast__active_out");
          afterRef.current.classList.remove("toast__container_after");

          //  require browser to start animation before rerender for smooth animation
          requestAnimationFrame(() => {
            //  now toast have animation and after even with timer of 5 s
            toast.classList.add("toast__active_in");
            afterRef?.current?.classList.add("toast__container_after");
          });

          // if timer is true make it false
          if (timerRef.current) clearTimeout(timerRef.current);

          timerRef.current = setTimeout(() => {
            // make it clocked so animation out will run in next rerender going in else condition
            setToastClicked(true);
            closeToast();
            timerRef.current = null;
          }, 5000);
        } else {
          // if present in animation remove
          toast.classList.remove("toast__active_in");

          if (toastClicked) {
            // if clicked run out a animation else just set default translation out of document view
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
  }, [isToast, toastClicked, closeToast, setToastClicked]);

  return {
    isToast,
    afterRef,
    msg,
    type,
    closeToast,
    setToastClicked,
  };
};
