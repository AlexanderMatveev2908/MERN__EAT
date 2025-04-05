import { FC, useEffect } from "react";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSingleManageOrdersAPI } from "../../../core/api/APICalls/manageOrders";
import { REG_MONGO } from "../../../core/config/constants/regex";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";
import { ErrFoodApp } from "../../../types/allTypes/API";
import ListItemsOrder from "../../../UI/components/ListItemsOrder";
import { isObjOk } from "../../../utils/allUtils/validateData";
import ParentContentLoading from "../../../UI/components/ParentContentLoading";
import { addKey } from "../../../utils/allUtils/genID";

const ManageSingleOrder: FC = () => {
  const orderId = useParams()?.orderId;
  const canStay = REG_MONGO.test(orderId ?? "");

  useScrollTop();
  const { handleErrAPI } = useGetFavHooks();

  const { data, isPending, isSuccess, isError, error } = useQuery({
    queryKey: ["manageSingleOrder"],
    queryFn: () => getSingleManageOrdersAPI(orderId ?? ""),
    enabled: canStay,
  });
  useEffect(() => {
    if (isError) handleErrAPI({ err: error as ErrFoodApp });
    if (isSuccess) console.log(data);
  }, [isError, error, isSuccess, data, handleErrAPI]);

  const { order } = data ?? {};

  return (
    <ParentContentLoading {...{ isPending, isError, error, canStay }}>
      {order && isObjOk(order) && (
        <div className="w-full grid justify-items-center">
          <ListItemsOrder {...{ order }} />

          <div className="w-full grid grid-rows-1 md:grid-cols-2 mt-6 gap-x-10 gap-y-5 items-start">
            {addKey([
              addKey(Object.entries(order.infoUser)),
              addKey(Object.entries(order.addressUser)),
            ]).map((arr) => (
              <ul
                key={arr.key}
                className="w-full grid border-[3px] border-orange-500 rounded-xl p-4"
              >
                {arr.el.map((el) =>
                  el.el[0] === "_id" ? null : (
                    <li
                      key={el.key}
                      className="w-full grid grid-cols-[75px_1fr] gap-5"
                    >
                      <span className="txt__01">{el.el[0]}</span>
                      <span className="txt__01 justify-self-end block overflow-x-scroll hide_scrollbar max-w-full">
                        {el.el[1]}
                      </span>
                    </li>
                  )
                )}
              </ul>
            ))}
          </div>
        </div>
      )}
    </ParentContentLoading>
  );
};
export default ManageSingleOrder;
