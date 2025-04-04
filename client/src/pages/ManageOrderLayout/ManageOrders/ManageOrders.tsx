import { FC } from "react";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import { useFormsCustom } from "../../../core/hooks/useGlobal";

const ManageOrders: FC = () => {
  useScrollTop();

  const { formContextMyDishesAddItem: formContext } = useFormsCustom();

  return <div>ManageOrders</div>;
};
export default ManageOrders;
