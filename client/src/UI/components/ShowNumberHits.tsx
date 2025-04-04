import { PartyPopper } from "lucide-react";
import { FC } from "react";
import { useLocation } from "react-router-dom";
import {
  REG_P_DISHES,
  REG_P_MY_REST,
  REG_P_SEARCH,
  REG_P_DISHES_USER,
  REG_P_MY_ORD,
  REG_P_MANAGE_ORD,
} from "../../core/config/constants/regex";
import { getTargetConfig } from "../../core/hooks/UI/useUpdatePlace";

type PropsType = {
  nHits?: number;
  totDocuments?: number;
  search?: string | undefined;
  searchVal?: string;
};

const ShowNumberHits: FC<PropsType> = ({
  nHits,
  totDocuments,
  search,
  searchVal,
}) => {
  const path = useLocation().pathname;

  const target = REG_P_DISHES.test(path)
    ? "dishes"
    : [REG_P_MY_REST, REG_P_SEARCH].some((reg) => reg.test(path))
    ? "restaurants"
    : REG_P_DISHES_USER.test(path)
    ? "dishes"
    : REG_P_MY_ORD.test(path) || REG_P_MANAGE_ORD.test(path)
    ? "orders"
    : null;

  const { arrToCheck } = getTargetConfig(path);
  const field = arrToCheck?.filter((el) => el.field === searchVal)?.[0];

  let info;

  if (search) {
    if (["country", "state", "city"].includes(field?.field))
      info = ` in ${search}`;
    if (["name", "id", "restaurantName", "restaurantId"].includes(field?.field))
      info = ` for ${search}`;
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
            {REG_P_SEARCH.test(path)
              ? "Good news, there are not restaurants available so you could be the first that could create one ✌🏼"
              : REG_P_DISHES_USER.test(path)
              ? "This restaurant does not have dishes right now, they are strategically preparing 🧐"
              : `You have Number(Array().fill()+Array().fill()) ${target} 🥸`}
          </span>
        </div>
      )}
    </div>
  );
};
export default ShowNumberHits;
