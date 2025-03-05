import { FC } from "react";
import { useSpinner } from "./hooks/useSpinner";

const Spinner: FC = () => {
  const { numEls, deg, passedFirstRender } = useSpinner();

  return (
    <div className="w-full h-full relative rounded-full spinner mt-[10vh] md:mt-[15vh]">
      {Array.from({ length: numEls }).map((_, i) => (
        <span
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 lg:w-[40%] xl:w-[35%] h-1/2 lg:h-[40%] xl:h-[35%] spinner__el ${
            passedFirstRender ? "active" : ""
          }`}
          style={
            {
              "--i": i,
              "--numEls": numEls,
              "--deg": `${deg}deg`,
              "--duration": passedFirstRender ? "1.5s" : "0.1s",
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
