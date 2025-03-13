import { FC } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";

type PropsType = {
  rating: number;
};

const AvgRating: FC<PropsType> = ({ rating }) => {
  return (
    <div className="w-full py-2 px-3 grid grid-cols-[125px_1fr]">
      <div className="flex w-full items-center gap-3">
        <FaRankingStar className="min-w-[30px] min-h-[30px]" />
        <span className="txt__01">Rating</span>
      </div>

      <div className="w-full flex gap-2 items-center">
        {Array.from({ length: 5 }).map((_, i) =>
          rating > i + 1 ? (
            <FaStar key={i} className="w-[25px] h-[25px]" />
          ) : i === Math.floor(rating) && rating % 1 >= 0.5 ? (
            <FaStarHalfAlt key={i} className="w-[25px] h-[25px]" />
          ) : (
            <FaRegStar key={i} className="w-[25px] h-[25px]" />
          )
        )}
      </div>
    </div>
  );
};
export default AvgRating;
