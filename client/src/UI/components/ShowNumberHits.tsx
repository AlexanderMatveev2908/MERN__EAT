import { PartyPopper } from "lucide-react";
import { FC } from "react";
import { useLocation } from "react-router-dom";

type PropsType = {
  nHits?: number;
  totDocuments?: number;
  isPending: boolean;
};

const ShowNumberHits: FC<PropsType> = ({ nHits, totDocuments, isPending }) => {
  const path = useLocation().pathname;

  const target =
    path === "/my-dishes"
      ? "dishes"
      : path === "/my-restaurants"
      ? "restaurants"
      : null;

  return isPending ? null : (
    <div className="w-full grid grid-cols-1">
      {totDocuments ? (
        nHits ? (
          <div className="w-full flex gap-5 items-center mt-[25px]">
            <PartyPopper className="min-w-[35px] min-h-[35px]" />
            <div className="w-fit flex gap-2 items-center">
              <span className="txt__04">{nHits}&nbsp;</span>

              <span className="txt__03">Result{nHits > 1 ? "s" : ""}</span>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-self-center justify-center items-center mt-[50px]">
            <span className="txt__03">Results = Number(new String()) 🥸</span>
          </div>
        )
      ) : (
        <div className="w-full flex justify-self-center justify-center mt-[50px]">
          <span className="txt__03">
            {path === "/search"
              ? "Good news, there are not restaurants available so you could be the first that could create one ✌🏼"
              : `You have Number(Array().fill()+Array().fill()) ${target} 🥸`}
          </span>
        </div>
      )}
    </div>
  );
};
export default ShowNumberHits;
