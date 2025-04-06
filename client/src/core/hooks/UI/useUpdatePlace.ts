/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "react-router-dom";
import { myDishesFieldsSearch } from "../../config/fieldsArr/allFields/MyDishes/filterSort";
import { searchRestFieldsSearch } from "../../config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";
import { myRestFieldsSearch } from "../../config/fieldsArr/fields";
import { useEffect, useState } from "react";
import { tailwindBreak } from "../../config/constants/breakpoints";
import {
  REG_P_DISHES,
  REG_P_MANAGE_ORD,
  REG_P_MY_ORD,
  REG_P_MY_REST,
  REG_P_SEARCH,
} from "../../config/constants/regex";
import { searchFieldsMyOrders } from "../../config/fieldsArr/allFields/myOrders/filterSort";
import { searchFieldsManageOrders } from "../../config/fieldsArr/allFields/manageOrders/filterSort";

export const getTargetConfig = (path: string) => {
  let target = "";
  let arrToCheck = [] as any;

  if (REG_P_SEARCH.test(path)) {
    target = "restaurant";
    arrToCheck = searchRestFieldsSearch;
  }
  if (REG_P_MY_REST.test(path)) {
    target = "restaurant";
    arrToCheck = myRestFieldsSearch;
  }
  if (REG_P_DISHES.test(path)) {
    target = "dish";
    arrToCheck = myDishesFieldsSearch;
  }
  if (REG_P_MY_ORD.test(path)) {
    target = "order";
    arrToCheck = searchFieldsMyOrders;
  }
  if (REG_P_MANAGE_ORD.test(path)) {
    target = "order";
    arrToCheck = searchFieldsManageOrders;
  }

  return {
    target,
    arrToCheck,
  };
};

export const useUpdatePlace = ({
  searchVals,
  customFilter,
}: {
  searchVals?: string[];
  customFilter?: (params: any) => string | undefined;
}) => {
  const [place, setPlace] = useState("");

  const path = useLocation().pathname;

  const { target, arrToCheck } = getTargetConfig(path);

  const label = customFilter
    ? customFilter(arrToCheck)
    : arrToCheck
        .filter((el) => el.field === searchVals)?.[0]
        ?.label?.toLowerCase();

  useEffect(() => {
    const updatePlace = () => {
      const w = window.innerWidth;

      if (w > tailwindBreak.sm)
        setPlace(`Search a ${target}${label ? ` by ${label}` : ""}...`);
      else setPlace(`${label[0].toUpperCase() + label.slice(1)}...`);
    };

    updatePlace();

    window.addEventListener("resize", updatePlace);

    return () => window.removeEventListener("resize", updatePlace);
  }, [target, label]);

  return { place };
};
