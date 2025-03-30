import { FC } from "react";
import { useForm } from "react-hook-form";
import { useCart, useUser } from "../../../core/hooks/useGlobal";
import { isObjOk } from "../../../utils/allUtils/validateData";
import SummaryItem from "./components/SummaryItem";
import ShowCalcCart from "./components/ShowCalcCart";
import FormFieldNoIcon from "../../forms/inputFields/FormFieldNoIcon";
import DeleteButton from "../buttons/DeleteButton";
import { fieldCoupon } from "../../../core/config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";
import { RestaurantAllUsers } from "../../../types/allTypes/search";
import SpinnerBtnReact from "../loaders/SpinnerBtnReact/SpinnerBtnReact";
import { useDeleteCart } from "../../../core/hooks/cartLogged/useDeleteCart";
import ButtonAnimated from "../buttons/ButtonAnimated";
import SummaryItemNoLogged from "./components/SummaryItemNoLogged";

type PropsType = {
  rest: RestaurantAllUsers;
};

const SummaryCart: FC<PropsType> = ({ rest }) => {
  const {
    register,
    formState: { errors },
  } = useForm<{ coupon: string }>({
    mode: "onChange",
  });

  const { cart, cartNonLogged } = useCart();
  const { isLogged } = useUser();
  const { isPending, handleDeleteCart } = useDeleteCart();

  const cartToCheck = isLogged ? cart : cartNonLogged;

  return (
    cartToCheck &&
    isObjOk(cartToCheck) && (
      <div className="w-full grid grid-cols-1 gap-4 border-[3px] border-orange-500 rounded-xl p-6 mb-6">
        <span className="txt__03 justify-self-center">Your Order</span>

        <ul className="w-full grid gap-5">
          {cartToCheck.items.map((el) =>
            isLogged ? (
              <SummaryItem key={el.dishId} {...{ item: el }} />
            ) : (
              <SummaryItemNoLogged key={el.dishId} {...{ item: el }} />
            )
          )}
        </ul>

        <ShowCalcCart {...{ cart: cartToCheck, rest }} />

        <form className="w-full grid gap-6">
          <FormFieldNoIcon {...{ field: fieldCoupon, register, errors }} />

          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 sm:gap-0 sm:grid-cols-2 items-center">
            <div className="w-[200px] justify-self-center flex ic">
              <ButtonAnimated
                {...{
                  label: "Checkout",
                  type: "button",
                  isDisabled: isPending,
                }}
              />
            </div>

            <div className="w-[200px] justify-self-center">
              {isPending ? (
                <SpinnerBtnReact />
              ) : (
                <DeleteButton
                  {...{
                    txt: "Clear",
                    handleDelete: handleDeleteCart,
                  }}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    )
  );
};
export default SummaryCart;
