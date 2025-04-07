import { FC } from "react";
import { RestaurantAllUsers } from "../../types/allTypes/search";
import { FaRegStar, FaStar, FaStarHalf, FaStarHalfAlt } from "react-icons/fa";

type PropsType = {
  rest: RestaurantAllUsers;
};

const AverageStars: FC<PropsType> = ({ rest }) => {
  const avg = 3.5;

  return (
    <div className="min-w-full grid p-6 border-[3px] rounded-xl border-orange-500 justify-items-center">
      <div className="w-full flex items-center justify-center gap-5">
        {Array.from({ length: 5 }).map((_, i) =>
          i + 1 <= avg ? (
            <FaStar className="text-orange-500 min-w-[40px] min-h-[40px]" />
          ) : i + 0.5 <= avg ? (
            <FaStarHalfAlt className="text-orange-500 min-w-[40px] min-h-[40px]" />
          ) : (
            <FaRegStar className="text-orange-500 min-w-[40px] min-h-[40px]" />
          )
        )}
      </div>
    </div>
  );
};
export default AverageStars;
