import { FC } from "react";
import ButtonAnimated from "../../ButtonAnimated/ButtonAnimated";

const Newsletter: FC = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-[200px_1fr] items-center gap-5">
      <div className="w-full flex flex-col">
        <span className="txt__02">Newsletter</span>
      </div>
      <form className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5 items-end">
        <div className="w-full ">
          <input
            type="email"
            className="input_base txt__01"
            placeholder="Your email..."
          />
        </div>

        <div className="w-full flex justify-start">
          <ButtonAnimated {...{ label: "Subscribe" }} />
        </div>
      </form>
      <div className="w-full flex lg:col-span-2">
        <span className="txt__00">
          Subscribe to our newsletter to receive the latest updates and get a
          chance to win a discount coupon.
        </span>
      </div>
    </div>
  );
};
export default Newsletter;
