import { FC, useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FaRegStar, FaStar } from "react-icons/fa";
import { AddPutReview } from "./MyReviewsForm";

type PropsType = {
  formContext: UseFormReturn<AddPutReview>;
};

const StarsCheck: FC<PropsType> = ({ formContext }) => {
  const [isHover, setIsHover] = useState(0);
  const clickRef = useRef<boolean>(false);
  //   const [refsRat, setRefsRat] = useState<{
  //     prev: null | number;
  //     curr: null | number;
  //   }>({
  //     prev: null,
  //     curr: null,
  //   });

  const {
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
  } = formContext;

  const rating = watch("rating");

  useEffect(() => {
    const animateStar = (e: MouseEvent) => {
      const els = document.getElementsByClassName("star__rev");

      let i = els.length - 1;
      do {
        const curr = els[i];
        if (curr.contains(e.target as Node)) {
          curr.classList.remove("register__checkbox");

          requestAnimationFrame(() => {
            curr.classList.add("register__checkbox");
          });

          break;
        }

        i--;
      } while (i >= 0);
    };

    document.addEventListener("click", animateStar);

    return () => {
      document.removeEventListener("click", animateStar);
    };
  }, []);

  useEffect(() => {
    const sub = watch((vals) => {
      //   if (vals.rating)
      //     setRefsRat((prev) => ({
      //       ...prev,
      //       curr: vals.rating ?? 0,
      //     }));

      if (vals.rating === 0)
        setError("rating", {
          message: "Rating is required if you want to leave a review",
        });
      else clearErrors("rating");
    });

    return () => sub.unsubscribe();
  }, [watch, setError, clearErrors]);

  return (
    <div className="w-full grid justify-items-center gap-3">
      <span className="txt__03 justify-self-start">Rating</span>

      <div className="w-full flex items-center justify-center gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <label
            onMouseOver={() => setIsHover(i + 1)}
            onMouseLeave={() => {
              clickRef.current = false;
              setIsHover(rating);
            }}
            onClick={() => {
              //   setRefsRat((prev) => {
              //     if (Object.values(prev).every((v) => typeof v === "object"))
              //       return { prev: i + 1, curr: i + 1 };
              //     else if (prev.curr === prev.prev && prev.curr === i + 1)
              //       return {
              //         prev: prev.curr,
              //         curr: prev.curr ? prev.curr - 1 : prev.curr,
              //       };
              //     else
              //       return {
              //         prev: prev.curr,
              //         curr: i + 1,
              //       };
              //   });
              if (rating === i + 1) clickRef.current = true;

              setValue("rating", i === rating - 1 ? i : i + 1, {
                shouldValidate: true,
              });
            }}
            className="w-fit flex items-center justify-center cursor-pointer el__flow star__rev"
            key={i}
          >
            {(clickRef.current ? rating : Math.max(isHover, rating)) >=
            i + 1 ? (
              <FaStar className="text-orange-500 min-w-[40px] min-h-[40px]" />
            ) : (
              <FaRegStar className="text-orange-500 min-w-[40px] min-h-[40px]" />
            )}
          </label>
        ))}
      </div>

      {errors?.rating?.message && (
        <span className="txt__01 text-red-600 justify-self-start">
          {errors.rating.message}
        </span>
      )}
    </div>
  );
};
export default StarsCheck;
