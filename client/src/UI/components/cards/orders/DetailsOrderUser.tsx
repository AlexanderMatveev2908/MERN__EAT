import { FC } from "react";
import { OrderType } from "../../../../types/types";

type PropsType = {
  order: OrderType;
};

const DetailsOrderUser: FC<PropsType> = ({ order }) => {
  return <div className="">DetailsOrderUser</div>;
};
export default DetailsOrderUser;
