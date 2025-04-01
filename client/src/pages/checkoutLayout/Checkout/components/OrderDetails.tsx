import { FC } from "react";
import ContentMath from "./ContentMath";

const OrderDetails: FC = () => {
  return (
    <div className="w-full grid gap-5 items-start h-fit">
      <span className="txt__03 justify-self-center">Order Details</span>

      <ContentMath />
    </div>
  );
};
export default OrderDetails;
