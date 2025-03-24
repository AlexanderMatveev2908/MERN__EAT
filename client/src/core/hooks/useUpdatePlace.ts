/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLocation } from "react-router-dom";
import { myDishesFieldsSearch } from "../config/fieldsArr/allFields/MyDishes/filterSort";
import { searchRestFieldsSearch } from "../config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";
import { myRestFieldsSearch } from "../config/fieldsArr/fields";
import { useEffect, useState } from "react";
import { tailwindBreak } from "../config/constants/breakpoints";

export const getTargetConfig = (path: string) => {
  let target;
  let arrToCheck;
  switch (path) {
    case "/search":
      target = "restaurant";
      arrToCheck = searchRestFieldsSearch;
      break;
    case "/my-restaurants":
      target = "restaurant";
      arrToCheck = myRestFieldsSearch;
      break;
    case "/my-dishes":
      target = "dish";
      arrToCheck = myDishesFieldsSearch;
      break;
    default:
      target = "";
      arrToCheck = [];
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
