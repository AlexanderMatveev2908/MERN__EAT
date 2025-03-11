import { FC } from "react";
import { REG_EMAIL } from "../../../../constants/regex";
import { CurrUserType } from "../../../../types/userTypes";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import SpinnerBtnReact from "./../../../../components/loaders/SpinnerBtnReact/SpinnerBtnReact";
import ButtonAnimated from "../../../../components/buttons/ButtonAnimated";
import { NewsLetterFormType } from "../hooks/useNewsletter";

type PropsType = {
  isPending: boolean;
  currUser: CurrUserType | null;
  submitNewsLetter: (e: React.FormEvent<HTMLFormElement>) => void;
  register: UseFormRegister<NewsLetterFormType>;
  errors: FieldErrors;
};

const NonLoggedUser: FC<PropsType> = ({
  isPending,
  currUser,
  submitNewsLetter,
  register,
  errors,
}) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <form className="grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] sm:grid-cols-2 gap-5 sm:gap-x-10 items-center">
        <div className="w-full flex flex-col gap-3">
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
              {errors?.email?.message as string}
            </span>
          )}
        </div>

        {isPending ? (
          <SpinnerBtnReact {...{ styleGiven: "justify-start" }} />
        ) : (
          <div className="w-full max-w-[200px] md:max-w-[225px] flex justify-start items-start">
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
        )}
      </form>
    </div>
  );
};
export default NonLoggedUser;
