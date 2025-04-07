/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { AddPutReview } from "./MyReviewsForm";
import { REG_TXT_REV } from "../../../core/config/constants/regex";

type PropsType = {
  formContext: UseFormReturn<AddPutReview>;
};

const CommentForm: FC<PropsType> = ({ formContext }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [valsScroll, setValsScroll] = useState({
    // mouse
    startY: 0,
    // thumb
    startTop: 0,
  });

  const {
    register,
    formState: { errors },
  } = formContext;

  useEffect(() => {
    const updateScroll = (e: MouseEvent) => {
      if (!isDragging) return;

      const txtArea = document.getElementById("textAreaId");
      const thumb = document.getElementById("txtThumb");

      // where mouse start and where is right now to get difference we work with
      const deltaY = e.clientY - valsScroll.startY;
      const newTop = Math.min(
        // where was thumb + difference of mouse position
        // math.max(0) to not make thumb go below 0 in his absolute position (like outside container)
        Math.max(0, valsScroll.startTop + deltaY),
        // not make thumb overflow bottom container binding it to prev of top result
        (txtArea?.clientHeight ?? 0) -
          // offset is height not just visible, all height of element
          (thumb?.offsetHeight ?? 0)
      );

      thumb!.style.top = `${newTop}px`;
      const scrollRatio =
        newTop / ((txtArea?.clientHeight ?? 0) - (thumb?.offsetHeight ?? 0));
      txtArea!.scrollTop =
        // scrollHeight is like offsetH, it represent ALL height but not of element, instead of SCROLLABLE content
        scrollRatio * (txtArea?.scrollHeight ?? 0) -
        (txtArea?.clientHeight ?? 0);
    };

    document.addEventListener("mousemove", updateScroll);

    return () => document.removeEventListener("mousemove", updateScroll);
  }, [isDragging, valsScroll]);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = "auto";
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <div className="w-full grid gap-3 ">
      <span className="txt__03">Comment (optional)</span>

      <div className="relative w-full h-fit">
        <textarea
          className="w-full border-2 border-orange-500 rounded-xl p-3 focus__base outline-0 hide_scrollbar pr-[20px] h-fit"
          rows={4}
          id="textAreaId"
          {...register("text", {
            required: false,
            pattern: {
              value: REG_TXT_REV,
              message: "Message if sent must have at least 10 chars",
            },
          })}
          onScroll={(e) => {
            // ration return between 0 and until both num are > 0 and part <=whole
            const txtArea = e.currentTarget;
            const txtThumb = document.getElementById("txtThumb");

            // scroll top is how much user has scrolled,
            // scrollHeight is total scrollable,
            // client height is visible text view
            //   result is between 0 and 1 and tell where user is
            const scrollRatio =
              txtArea.scrollTop /
              // scroll ALL HEIGHT, client ONLY VISIBLE
              (txtArea.scrollHeight - txtArea.clientHeight);
            //   multiply ration for,
            // maxHeight of input less height of thumb so it not overflow
            const thumbTop =
              scrollRatio *
              (txtArea.clientHeight -
                (txtThumb as HTMLDivElement)?.offsetHeight +
                5);

            (txtThumb as HTMLTextAreaElement).style.top = `${thumbTop}px`;
          }}
        />

        <div className="absolute top-0 right-0 w-[15px] rounded-full bg-orange-500 h-[95%]">
          <div
            onMouseDown={(e) => {
              setIsDragging(true);
              setValsScroll({
                startY: e.clientY,
                startTop: (e.currentTarget as HTMLDivElement).offsetTop,
              });

              document.body.style.userSelect = "none";
            }}
            className="bg-black w-full rounded-full absolute top-0 z-60 h-[50px] right-0 cursor-pointer"
            id="txtThumb"
          ></div>
        </div>
      </div>

      {errors?.text?.message && (
        <span className="txt__01 text-red-600">{errors.text.message}</span>
      )}
    </div>
  );
};
export default CommentForm;
