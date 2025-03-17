import { FC } from "react";
import { useImgSlider } from "./useImgSlider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageUploadedType } from "../../../types/types";

type PropsType = {
  images: ImageUploadedType[] | { id: string; img: string }[];
};

const ImgSlider: FC<PropsType> = ({ images }) => {
  const { activeIndx, handleNext, handlePrev, setBtnClicked, translateVal } =
    useImgSlider({ images });
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

        <div className="w-full flex justify-items-start overflow-x-auto hide_scrollbar snap-mandatory snap-x p-6 border-2 border-orange-500 rounded-xl gap-[5%]">
          {images.map((el) => (
            <div
              key={el.id}
              className="min-h-[200px] max-h-[200px] min-w-[200px] max-w-[200px] sm:min-h-[400px] sm:max-h-[400px] sm:min-w-[400px] sm:max-w-[400px]  snap-center object-cover rounded-xl transition-all duration-500 overflow-hidden"
              style={{
                transform: `translateX(-${
                  activeIndx * translateVal + activeIndx * 10
                }%)`,
              }}
            >
              <img
                src={el.img}
                alt="burger_hero"
                className="w-full object-cover h-fit "
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
