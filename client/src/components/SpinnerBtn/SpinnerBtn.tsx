import { FC } from "react";

const SpinnerBtn: FC = () => {
  return (
    <div className="spinner_btn">
      {Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
        <span className="spinner_tbn__el">{num}</span>
      ))}
    </div>
  );
};
export default SpinnerBtn;
