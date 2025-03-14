import { FC } from "react";
import { useNewsletter } from "./useNewsletter";
import LoggedNewsLetter from "./components/LoggedNewsLetter";
import NonLoggedUser from "./components/NonLoggedUser";

const Newsletter: FC = () => {
  const {
    isLogged,
    toggleNewsLetter,
    isPendingLogged,
    register,
    errors,
    currUser,
    submitSubscribeNonLoggedUser,
    isPendingNonLogged,
    handleRedirection,
  } = useNewsletter();

  return (
    <div className="flex w-full flex-col items-start gap-5">
      <div
        className={`w-full grid items-center gap-4  ${
          isLogged
            ? "grid-cols-[repeat(auto-fit,minmax(200px,1fr))] sm:grid-cols-2"
            : " grid-cols-1 lg:grid-cols-[200px_1fr]"
        }`}
      >
        <div className="w-full flex flex-col self-start">
          <span className="txt__02">Newsletter</span>
        </div>
        {isLogged ? (
          <LoggedNewsLetter
            {...{
              currUser,
              submitNewsLetter: toggleNewsLetter,
              isPending: isPendingLogged,
            }}
          />
        ) : (
          <NonLoggedUser
            {...{
              register,
              errors,
              submitNewsLetter: submitSubscribeNonLoggedUser,
              currUser,
              isPending: isPendingNonLogged,
            }}
          />
        )}
      </div>

      {!isLogged && (
        <div className="w-full flex justify-start">
          <span
            onClick={handleRedirection}
            className="txt__01 el__after_below cursor-pointer el__flow hover:text-orange-500"
          >
            Send link to unsubscribe
          </span>
        </div>
      )}

      <div className="w-full flex">
        <span className="txt__00">
          Subscribe to our newsletter to receive the latest updates and get a
          chance to win a discount coupon.
        </span>
      </div>
    </div>
  );
};
export default Newsletter;
