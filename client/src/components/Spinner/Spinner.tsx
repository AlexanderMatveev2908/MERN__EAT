import { FC } from "react";
import { useSpinner } from "./useSpinner";

const Spinner: FC = () => {
  const { numEls, deg } = useSpinner();

  return (
    <div className="w-full h-full relative spinner">
      {Array.from({ length: numEls }).map((_, i) => (
        <span
          className="absolute top-0 left-0 w-full h-full spinner__el"
          style={
            {
              "--i": i,
              "--numEls": numEls,
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
