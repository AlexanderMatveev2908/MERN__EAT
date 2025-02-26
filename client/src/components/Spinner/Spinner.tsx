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
