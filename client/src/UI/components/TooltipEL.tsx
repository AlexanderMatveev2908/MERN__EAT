import { FC, useEffect, useRef } from "react";

type PropsType = {
  txt: string;
  label: string;
};

const TooltipEL: FC<PropsType> = ({ txt, label }) => {
  const elToCpyRef = useRef<HTMLButtonElement | null>(null);
  const toolRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const animateTooltip = (e: MouseEvent) => {
      const id = elToCpyRef.current;
      const tooltip = toolRef.current;

      if (id && tooltip) {
        if (id?.contains(e.target as Node)) {
          tooltip?.classList.remove("generate_password__tooltip");

          requestAnimationFrame(() =>
            tooltip?.classList.add("generate_password__tooltip")
          );
        }
      }
    };

    document.addEventListener("click", animateTooltip);

    return () => document.removeEventListener("click", animateTooltip);
  }, [txt]);

  const handleCopyId = () => {
    if (elToCpyRef.current) {
      navigator.clipboard.writeText(elToCpyRef.current.innerText);
    }
  };

  return (
    <div className="relative group flex items-center">
      <button
        type="button"
        ref={elToCpyRef}
        onClick={handleCopyId}
        className="el__flow cursor-pointer hover:text-orange-500 outline-none"
      >
        <span className="txt__01 block overflow-x-auto sm:max-w-[200px] hide_scrollbar">
          {txt}
        </span>
      </button>
      <span
        ref={toolRef}
        className="absolute lg:text-lg px-4 py-1 -top-full left-1/4 border-2 border-orange-500 rounded-xl w-full whitespace-nowrap bg-[#111] pointer-events-none z-20 txt__00 max-w-fit px-6 min-w-[150px] opacity-0"
      >
        {label} copied ✌🏼
      </span>
    </div>
  );
};
export default TooltipEL;
