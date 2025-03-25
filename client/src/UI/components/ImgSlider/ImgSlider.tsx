import { FC } from "react";
import { useImgSlider } from "./useImgSlider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageUploadedType } from "../../../types/types";
import { useLocation } from "react-router-dom";
import { REG_P_DISHES_USER } from "../../../core/config/constants/regex";

type PropsType = {
  images: ImageUploadedType[] | { id: string; img: string }[];
};

const ImgSlider: FC<PropsType> = ({ images }) => {
  const path = useLocation().pathname;

  const { activeIndx, handleNext, handlePrev, setBtnClicked } = useImgSlider({
    images,
  });

  return (
    <div className="pad__page w-full pt-5 flex flex-col justify-center">
      <div className="w-full flex items-center relative">
        <button
          onClick={() => {
            setBtnClicked(true);
            handlePrev();
          }}
          className="absolute top-1/2 left-0 -translate-y-1/2 hero__i_arrow outline-none"
        >
          <ChevronLeft className="h-[50px] w-[50px] text-orange-500 btn__pseudo hover:scale-120" />
        </button>

        <div className="flex w-full overflow-hidden border-2 border-orange-500 p-6 rounded-xl gap-[10%]">
          {images.map((el) => (
            <div
              key={el?.public_id ?? el.id}
              className={`min-w-[200px] h-[200px] ${
                !REG_P_DISHES_USER.test(path)
                  ? "sm:min-w-[350px] sm:h-[350px]"
                  : ""
              } rounded-xl transition-all duration-500 overflow-hidden`}
              style={{
                transform: `translateX(-${activeIndx * 100}%`,
              }}
            >
              <img
                src={el?.url ?? el.img}
                alt="burger_hero"
                className="min-w-full object-cover h-full "
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setBtnClicked(true);
            handleNext();
          }}
          className="absolute top-1/2 right-0 -translate-y-1/2 hero__i_arrow outline-none"
        >
          <ChevronRight className="h-[50px] w-[50px] text-orange-500 btn__pseudo hover:scale-120" />
        </button>
      </div>
    </div>
  );
};
export default ImgSlider;
