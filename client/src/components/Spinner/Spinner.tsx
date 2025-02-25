import { FC } from "react";

const Spinner: FC = () => {
  return (
    <div className="min-w-full min-h-full relative loader">
      {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
        <span
          className="absolute top-0 left-0 w-full h-full loader__el"
          style={
            {
              "--i": num,
              transform: `rotate(${20 * num}deg)`,
            } as React.CSSProperties
          }
          key={num}
        ></span>
      ))}
    </div>
  );
};
export default Spinner;
