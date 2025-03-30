import { FC, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import { REG_MONGO } from "../../../core/config/constants/regex";
import { useQuery } from "@tanstack/react-query";
import {
  getDishesRestAsUser,
  getRestaurantAsUserAPI,
} from "../../../core/api/APICalls/searchAllUsers";
import { useHandleErr } from "../../../core/hooks/useHandleErr";
import { ErrFoodApp } from "../../../types/allTypes/API";
import LoaderPageReact from "../../../UI/components/loaders/LoaderPageReact/LoaderPageReact";
import ErrEmoji from "../../../UI/components/ErrEmoji";
import ImgSlider from "../../../UI/components/ImgSlider/ImgSlider";
import { MdAdminPanelSettings } from "react-icons/md";
import DetailsRestaurantUser from "../../../UI/components/cards/restaurants/DetailsRestaurantUser";
import DropElAbsolute from "../../../UI/components/DropElAbsolute";
import SearchBar from "../../../UI/common/SearchBar/SearchBar";
import { searchDishesSorters } from "../../../core/config/fieldsArr/allFields/SearchRestAllUsers/filterSorter";
import { isObjOk } from "../../../utils/allUtils/validateData";
import {
  useCart,
  useFormsCustom,
  useUser,
} from "../../../core/hooks/useGlobal";
import { useCreateQueryHandlers } from "../../../core/hooks/useCreateQueryHandlers";
import { FormProvider } from "react-hook-form";
import BlockPages from "../../../UI/components/BlockPages/BlockPages";
import { createURLParamsMyDishes } from "../../../utils/allUtils/makeURLParams";
import DishItem from "./components/DishItem";
import ShowHitsByNumbers from "../../../UI/components/ShowHitsByNumbers";
import SummaryCart from "../../../UI/components/SummaryCart/SummaryCart";

const SearchRestPage: FC = () => {
  useScrollTop();

  const { handleErrAPI } = useHandleErr();
  const { isLogged } = useUser();
  const { cart, cartNonLogged } = useCart();
  const { formContextSearchDishesAllUSers: formContext } = useFormsCustom();

  const {
    watch,
    formState: { errors },
  } = formContext;
  const minPrice = watch("minPrice");
  const maxPrice = watch("maxPrice");
  const minQuantity = watch("minQuantity");
  const maxQuantity = watch("maxQuantity");

  const restId = useParams()?.restId;

  const canStay = REG_MONGO.test(restId ?? "");
  const {
    data: dataRest,
    isPending: isPendingRest,
    isSuccess: isSuccessRest,
    isError: isErrorRest,
    error: errorRest,
  } = useQuery({
    queryKey: ["restAsUser", restId],
    queryFn: () => getRestaurantAsUserAPI(restId ?? ""),
    enabled: canStay,
  });
  useEffect(() => {
    if (isErrorRest) handleErrAPI({ err: errorRest as ErrFoodApp });
  }, [isSuccessRest, isErrorRest, errorRest, dataRest, handleErrAPI]);

  const { restaurant: rest } = dataRest ?? {};

  const cartToCheck = isLogged ? cart : cartNonLogged;
  const isBuyingSameRest =
    isObjOk(cartToCheck) && cartToCheck?.restaurant === rest?._id;

  const {
    handleSave,
    handleClear,
    propsBlock,
    data: dataDishes,
    isPending: isPendingDishes,
    isError: isErrorDishes,
    error: errorDishes,
    isSuccess: isSuccessDishes,
    closeAllDrop,
  } = useCreateQueryHandlers({
    formCtx: formContext,
    key: "searchDishesAsUser",
    cbAPI: (params: URLSearchParams) =>
      getDishesRestAsUser(params, restId ?? ""),
    cbProcessForm: createURLParamsMyDishes,
  });

  const { dishes, totDocuments, totPages, nHits, isAdmin } = dataDishes ?? {};

  return !canStay ? (
    <Navigate to="/" replace />
  ) : isPendingRest ? (
    <LoaderPageReact />
  ) : isErrorRest ? (
    <ErrEmoji {...{ err: errorRest as ErrFoodApp }} />
  ) : (
    rest &&
    isObjOk(rest) && (
      <div className="w-full grid grid-cols-1 justify-items-center gap-5">
        <span className="txt__04 truncate max-w-full">{rest.name}</span>

        {rest.isAdmin && (
          <Link
            to={`/my-restaurants/${rest._id}`}
            className="justify-self-end border-2 border-orange-500 py-1 sm:py-2 px-4 pr-6 rounded-xl group flex gap-4 items-center hover:scale-110 el__flow cursor-pointer"
          >
            <MdAdminPanelSettings className="icon__base group-hover:text-orange-500 el__flow" />
            <span className="txt__02 group-hover:text-orange-500 el__flow">
              Admin page
            </span>
          </Link>
        )}

        <ImgSlider {...{ images: rest.images }} />

        <div className="w-full grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-3 gap-x-6 items-start">
          <DetailsRestaurantUser {...{ rest, Container: DropElAbsolute }} />
        </div>

        {isBuyingSameRest && (
          <div id="summaryRestPage" className="w-full mt-6">
            <SummaryCart {...{ rest: dataRest?.restaurant }} />
          </div>
        )}

        <FormProvider {...formContext}>
          <SearchBar
            {...{
              formContext,
              handleSave,
              handleClear,
              closeAllDrop,
              isPending: isPendingDishes,
              sorters: searchDishesSorters,
            }}
          />
        </FormProvider>

        {isSuccessDishes && (
          <ShowHitsByNumbers
            {...{
              nHits,
              totDocuments,
              minPrice,
              maxPrice,
              minQuantity,
              maxQuantity,
              errors,
            }}
          />
        )}

        {isPendingDishes ? (
          <LoaderPageReact />
        ) : isErrorDishes ? (
          <ErrEmoji {...{ err: errorDishes as ErrFoodApp }} />
        ) : (
          !!dishes?.length && (
            <div className="container__cards">
              {dishes.map((el) => (
                <DishItem key={el._id} {...{ dish: el, isAdmin }} />
              ))}
            </div>
          )
        )}

        <BlockPages {...{ ...propsBlock, totPages }} />
      </div>
    )
  );
};
export default SearchRestPage;
