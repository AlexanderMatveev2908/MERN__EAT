import { FC } from "react";
import ButtonAnimated from "../../../buttons/ButtonAnimated/ButtonAnimated";
import { useNewsletter } from "./hooks/useNewsletter";
import SpinnerBtnReact from "../../../loaders/SpinnerBtnReact/SpinnerBtnReact";
import { REG_EMAIL } from "../../../../constants/regex";

const Newsletter: FC = () => {
  const {
    handleClickNonLoggedUser,
    isLogged,
    submitNewsLetter,
    isPending,
    register,
    errors,
    currUser,
  } = useNewsletter();

  return (
    <div
      className={`w-full grid items-center gap-3  ${
        currUser?.hasSubscribedToNewsletter
          ? "grid-cols-2"
          : " grid-cols-1 lg:grid-cols-[200px_1fr]"
      }`}
    >
      <div className="w-full flex flex-col">
        <span className="txt__02">Newsletter</span>
      </div>
      <form className="grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-y-5 gap-x-10 items-end ">
        {!isLogged && (
          <div className="w-full ">
            <input
              type="email"
              className="input__base txt__01"
              placeholder="Your email..."
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: REG_EMAIL,
                  message: "Enter a valid email to receive great discounts ",
                },
              })}
            />
            {errors?.email?.message && (
              <span className="txt__00 text-red-600">
                {errors?.email?.message}
              </span>
            )}
          </div>
        )}
        {isLogged ? (
          isPending ? (
            <SpinnerBtnReact />
          ) : (
            <div className="w-full max-w-[200px] md:max-w-[225px] flex justify-start">
              <ButtonAnimated
                {...{
                  label: currUser?.hasSubscribedToNewsletter
                    ? "Unsubscribe"
                    : "Subscribe",
                  type: "submit",
                  handleClick: submitNewsLetter,
                }}
              />
            </div>
          )
        ) : (
          <div className="w-full max-w-[200px] md:max-w-[225px] flex justify-start">
            <ButtonAnimated
              {...{
                label: "Login Now",
                type: "button",
                handleClick: handleClickNonLoggedUser,
              }}
            />
          </div>
        )}
      </form>
      <div
        className={`w-full flex ${
          currUser?.hasSubscribedToNewsletter ? "col-span-2" : "lg:col-span-2 "
        }`}
      >
        <span className="txt__00">
          Subscribe to our newsletter to receive the latest updates and get a
          chance to win a discount coupon.
        </span>
      </div>
    </div>
  );
};
export default Newsletter;
