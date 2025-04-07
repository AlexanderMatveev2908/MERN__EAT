import { FC } from "react";
import { RestaurantAllUsers } from "../../types/allTypes/search";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

type PropsType = {
  rest: RestaurantAllUsers;
};

const AverageStars: FC<PropsType> = ({ rest }) => {
  return (
    <div className="min-w-full grid p-6 border-[3px] rounded-xl border-orange-500 justify-items-center gap-4">
      <div className="w-full flex items-center justify-center gap-5">
        {Array.from({ length: 5 }).map((_, i) =>
          i + 1 <= rest.avgRating ? (
            <FaStar className="text-orange-500 min-w-[40px] min-h-[40px]" />
          ) : i + 0.5 <= rest.avgRating ? (
            <FaStarHalfAlt className="text-orange-500 min-w-[40px] min-h-[40px]" />
          ) : (
            <FaRegStar className="text-orange-500 min-w-[40px] min-h-[40px]" />
          )
        )}
      </div>

      <div className="w-full grid items-center grid-cols-2">
        <div className="w-full flex items-center gap-5">
          <span className="txt__01">Avg rating:</span>
          <span className="txt__02">{rest.avgRating}</span>
        </div>

        <span className="txt__01 justify-self-end">
          Reviews ({rest.reviews?.length})
        </span>
      </div>
    </div>
  );
};
export default AverageStars;
