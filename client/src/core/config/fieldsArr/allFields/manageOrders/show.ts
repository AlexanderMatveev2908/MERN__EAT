import { FaCartShopping } from "react-icons/fa6";
import { genID } from "../../../../../utils/utils";
import { UserAddressType } from "../../../../../types/types";
import { FaStreetView } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { ImProfile } from "react-icons/im";

export const fieldItemsMyOrders = {
  icon: FaCartShopping,
  label: "Items",
  id: genID(),
};

export const showUserAddressInOrder = (address: UserAddressType) => {
  const keys = ["country", "state", "city", "street", "zipCode", "phone"];
  const content: string[] = [];

  let i = 0;

  do {
    if (address[keys[i]]) content.push(address[keys[i]]);

    i++;
  } while (i < keys.length);

  return content;
  // return content.map((el) => ({
  //   val: el,
  //   id: genID(),
  // }));
};

export const fieldUserAddressMyOrders = (address: UserAddressType) => ({
  icon: FaStreetView,
  label: "User address",
  id: genID(),
  vals: showUserAddressInOrder(address),
});

export const fieldItemsList = {
  icon: CiBoxList,
  label: "Items list",
  id: genID(),
};

export const showPairsUserInfo = (
  userDetails: string[][],
  userAddress: string[][]
) =>
  [
    // from arr of string arr i make obj with pair as key + an id as key
    {
      icon: ImProfile,
      label: "User details",
      pairs: userDetails.map((el) => ({ pair: el, id: genID() })),
    },
    {
      icon: FaStreetView,
      label: "User address",
      pairs: userAddress.map((el) => ({ pair: el, id: genID() })),
    },
  ].map((el) => ({
    ...el,
    id: genID(),
  }));
