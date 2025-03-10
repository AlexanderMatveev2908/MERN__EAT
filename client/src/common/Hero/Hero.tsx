import { FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHero } from "./hooks/useHero";
import { heroFieldsArr } from "../../config/fieldsArr/heroFieldsArr";

const Hero: FC = () => {
  const { activeIndx, handleNext, handlePrev, setBtnClicked, translateVal } =
    useHero();

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

        <div className="w-full flex justify-items-center gap-[10%] overflow-x-auto hide_scrollbar snap-mandatory snap-x p-6 border-2 border-orange-500 rounded-xl">
          {heroFieldsArr.map((el) => (
            <div
              key={el.id}
              className="min-w-[75vw] sm:min-w-[450px] snap-center rounded-xl transition-all duration-500 overflow-hidden"
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
export default Hero;
