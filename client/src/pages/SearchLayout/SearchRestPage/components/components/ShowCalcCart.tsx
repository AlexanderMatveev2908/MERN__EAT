import { FC } from "react";

const ShowCalcCart: FC = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex justify-between items-center">
        <span className="txt__01">Subtotal</span>
        <span className="txt__01">$100.00</span>
      </div>

      <div className="w-full flex justify-between items-center">
        <span className="txt__01">Delivery</span>
        <span className="txt__01">$20.00</span>
      </div>

      <div className="w-full flex justify-between items-center">
        <span className="txt__01">Total</span>
        <span className="txt__01">$120.00</span>
      </div>
    </div>
  );
};
export default ShowCalcCart;
