import { FC } from "react";
import { PartyPopper } from "lucide-react";
import { priceFormatter } from "../../utils/utils";
import { FieldErrors } from "react-hook-form";

type PropsType = {
  totDocuments: number;
  nHits?: number;
  minPrice: string;
  maxPrice: string;
  minQuantity: string;
  maxQuantity: string;
  errors: FieldErrors;
};

const ShowHitsByNumbers: FC<PropsType> = ({
  nHits,
  totDocuments,
  minPrice,
  maxPrice,
  minQuantity,
  maxQuantity,
  errors,
}) => {
  // did this dummy ternaries to show vals for fun, the entire components is copied from ShowNumberHits so there is no need to remake it if there is no interest in showing numeric vals about filters

  let info = "";
  if (!errors?.minPrice && !errors?.maxPrice) {
    if (minPrice) info += ` above ${priceFormatter({ price: +minPrice })}`;
    const maxPriceFormatted = priceFormatter({ price: +maxPrice || 0 });
    if (maxPrice)
      info += ` ${
        minPrice && maxPrice ? "and" : ""
      } below ${maxPriceFormatted}`;
  }
  if (!errors?.minQuantity && !errors?.maxQuantity) {
    if (minQuantity)
      info += ` ${minPrice || maxPrice ? ", and " : ""}above ${minQuantity}`;
    if (maxQuantity)
      info += `${
        minQuantity ? " and" : minPrice || maxPrice ? ", and" : " "
      } below ${maxQuantity}`;
  }

  return (
    <div className="w-full grid grid-cols-1">
      {totDocuments ? (
        nHits ? (
          <div className="w-full flex gap-5 items-center mt-[25px]">
            <PartyPopper className="min-w-[35px] min-h-[35px]" />
            <div className="w-fit flex gap-2 items-center">
              <span className="txt__04">{nHits}&nbsp;</span>

              <span className="txt__03">
                Result{nHits > 1 ? "s" : ""}
                {info}
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-self-center justify-center items-center mt-[50px]">
            <span className="txt__03">
              Results Number(new String()) 🥸{info}
            </span>
          </div>
        )
      ) : (
        <div className="w-full flex justify-self-center justify-center mt-[50px]">
          <span className="txt__03">
            This restaurant does not have dishes right now, they are
            strategically preparing 🧐
          </span>
        </div>
      )}
    </div>
  );
};
export default ShowHitsByNumbers;
