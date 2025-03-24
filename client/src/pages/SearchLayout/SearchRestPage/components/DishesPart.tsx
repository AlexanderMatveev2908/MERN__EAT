import { FC } from "react";
import { DishType } from "../../../../types/types";

type PropsType = {
  dishes: DishType;
};

const DishesCards: FC<PropsType> = ({ dishes }) => {
  return <div>DishesPart</div>;
};
export default DishesCards;
