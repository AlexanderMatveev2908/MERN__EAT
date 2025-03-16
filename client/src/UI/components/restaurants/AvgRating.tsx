import { FC } from "react";
import { FaRankingStar } from "react-icons/fa6";

type PropsType = {
  rating: number;
};

const AvgRating: FC<PropsType> = ({ rating }) => {
  return (
    <div className="w-[90%] justify-self-center grid grid-cols-[30px_1fr_1fr] gap-5 items-end px-3 py-1">
      <FaRankingStar className="min-w-[30px] min-h-[30px] el__flow group-hover:text-orange-500" />

      <span className="txt__01 el__flow group-hover:text-orange-500">
        Rating
      </span>

      <div className="w-full flex justify-end pr-3">
        <span className="txt__02">{rating}</span>
      </div>

      {/* <div className="w-full flex gap-2 items-center">
        {Array.from({ length: 5 }).map((_, i) =>
          rating > i + 1 ? (
            <FaStar key={i} className="w-[25px] h-[25px]" />
          ) : i === Math.floor(rating) && rating % 1 >= 0.5 ? (
            <FaStarHalfAlt key={i} className="w-[25px] h-[25px]" />
          ) : (
            <FaRegStar key={i} className="w-[25px] h-[25px]" />
          )
        )}
      </div> */}
    </div>
  );
};
export default AvgRating;
