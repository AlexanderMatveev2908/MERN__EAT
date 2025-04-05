import { FC } from "react";
import { RestaurantAllUsers } from "../../../../types/allTypes/search";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetFavHooks } from "../../../../core/hooks/useGetFavHooks";
import { useForm } from "react-hook-form";
import { sendOrderAPI } from "../../../../core/api/APICalls/orders";
import { makeDelay } from "../../../../utils/allUtils/apiUtils";
import { ErrFoodApp } from "../../../../types/allTypes/API";
import { useCart, useUser } from "../../../../core/hooks/useGlobal";
import { isObjOk } from "../../../../utils/allUtils/validateData";
import SummaryItem from "./components/SummaryItem";
import SummaryItemNoLogged from "./components/SummaryItemNoLogged";
import ShowCalcCart from "./components/ShowCalcCart";
import FormFieldNoIcon from "../../../../UI/forms/inputFields/FormFieldNoIcon";
import { fieldCoupon } from "../../../../core/config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";
import ButtonAnimated from "../../../../UI/components/buttons/ButtonAnimated";
import DeleteButton from "../../../../UI/components/buttons/DeleteButton";
import { useDeleteCart } from "../../../../core/hooks/cartLogged/useDeleteCart";

type PropsType = {
  rest: RestaurantAllUsers;
};

const SummaryCart: FC<PropsType> = ({ rest }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryClient = useQueryClient();

  const { handleErrAPI } = useGetFavHooks();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ coupon: string }>({
    mode: "onChange",
  });

  const { isPending: isPendingSubmit, mutate } = useMutation({
    mutationFn: (coupon?: string) => sendOrderAPI({ coupon }),
    onSuccess: (data) =>
      makeDelay(() => {
        navigate(`/my-orders/checkout?orderId=${data.orderId}`, {
          state: { from: location.pathname },
        });
      }),
    onError: (err: ErrFoodApp) => handleErrAPI({ err }),
    onSettled: () => queryClient.removeQueries({ queryKey: ["myCart"] }),
  });

  const handleSend = handleSubmit((formData) => {
    mutate(formData?.coupon ?? undefined);
  });

  //  I KEEP CART STATE OF NON LOGGED IN CTX AND HANDLE CART SAVED IN DB WITH CUSTOM HOOKS
  const { cart, cartNonLogged, setCartNonLogged } = useCart();
  const { isLogged } = useUser();
  const { isPending: isPendingClear, handleDeleteCart } = useDeleteCart();

  const cartToCheck = isLogged ? cart : cartNonLogged;
  const handleCheckout = () =>
    isLogged
      ? null
      : navigate("/auth/login", {
          state: { from: location.pathname },
        });
  const clearCartNonLogged = () => setCartNonLogged(null);

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

        <form onSubmit={handleSend} className="w-full grid gap-6">
          {isLogged && (
            <FormFieldNoIcon {...{ field: fieldCoupon, register, errors }} />
          )}

          <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 sm:gap-0 sm:grid-cols-2 items-center">
            <div
              className={`${
                isLogged ? "w-[200px]" : "w-[250px]"
              } justify-self-center flex `}
            >
              <ButtonAnimated
                {...{
                  label: isLogged ? "Checkout" : "Login now to order",
                  type: isLogged ? "submit" : "button",
                  isDisabled: isPendingClear,
                  handleClick: handleCheckout,
                  isPending: isPendingSubmit,
                }}
              />
            </div>

            <div className="w-[200px] justify-self-center">
              <DeleteButton
                {...{
                  txt: "Clear",
                  handleDelete: isLogged
                    ? handleDeleteCart
                    : clearCartNonLogged,
                  isDisabled: isPendingSubmit,
                  isPending: isPendingClear,
                }}
              />
            </div>
          </div>
        </form>
      </div>
    )
  );
};
export default SummaryCart;
