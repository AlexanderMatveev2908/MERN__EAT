import { FC } from "react";
import { useSpinner } from "./useSpinner";

const Spinner: FC = () => {
  const { numEls, deg } = useSpinner();

  return (
    <div className="w-[200px] h-[200px] lg:h-[300px] lg:w-[300px] relative">
      {Array.from({ length: numEls }).map((_, i) => (
        <span
          className={` spinner__el absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 min-w-full min-h-full`}
          style={
            {
              "--i": i,
              "--numEls": numEls,
              "--deg": `${deg}deg`,
              transform: `rotate(${deg * i}deg)`,
            } as React.CSSProperties
          }
          key={i}
        ></span>
      ))}
    </div>
  );
};
export default Spinner;

{
  /* <div className="w-3/4 h-3/4 md:w-1/2 md:h-1/2 xl:max-w-[40%%] xl:max-h-[40%] 2xl:max-w-[35%] 2xl:max-h-[35%]">
        <Spinner />
      </div> */
}
