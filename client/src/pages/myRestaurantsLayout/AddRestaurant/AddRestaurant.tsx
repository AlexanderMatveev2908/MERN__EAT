import { FC, FormEvent, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import MyRestaurantsForm from "../../../UI/forms/MyRestaurants/MyRestaurantsForm";
import { useScrollTop } from "../../../core/hooks/UI/useScrollTop";
import { prepareFormDataMyRest } from "../../../utils/utils";
import { MyRestaurantsAddUpdateFormType } from "../../../types/types";
import { ErrFoodApp } from "../../../types/allTypes/API";
import { createRestaurantAPI } from "../../../core/api/api";
import { useMutation } from "@tanstack/react-query";
import { isDev } from "../../../core/config/constants/environment";
import { defaultValuesMyRest } from "../../../core/config/onlyDev/defVals";
import { useGetFavHooks } from "../../../core/hooks/useGetFavHooks";
import { useNavigate } from "react-router-dom";
import { myRestaurantsAddressByArea } from "../../../core/config/fieldsArr/fields";

const AddRestaurant: FC = () => {
  useScrollTop();

  const navigate = useNavigate();
  const [currFormAddress, setCurrFormAddress] = useState(0);

  const { showToastMsg, handleErrAPI } = useGetFavHooks();

  const formContext = useForm<MyRestaurantsAddUpdateFormType>({
    mode: "onChange",
    defaultValues: isDev ? { ...defaultValuesMyRest } : {},
  });

  useEffect(() => {
    formContext.setFocus("name");
  }, [formContext]);

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => createRestaurantAPI(formData),
    onSuccess: (data) => {
      showToastMsg("Restaurant created successfully", "SUCCESS");
      navigate(`/my-restaurants/${data?.restId}`);
    },
    onError: (err: ErrFoodApp) => {
      handleErrAPI({ err });
    },
  });

  const handleSave = (e: FormEvent) => {
    e.preventDefault();

    const vals = formContext.getValues();
    let isValid = true;
    let i = 0;

    do {
      const curr = myRestaurantsAddressByArea[i];

      for (const key in vals) {
        const innerCurr = curr.find((el) => el.field === key);
        if (innerCurr && !innerCurr.reg.test(vals[key])) {
          isValid = false;
          break;
        }
      }

      if (!isValid) break;

      i++;
    } while (i < myRestaurantsAddressByArea.length);

    if (!isValid) {
      setCurrFormAddress(i);

      formContext.trigger();

      const swapAddRestForm = document.getElementById("addressSwapAddRest");
      const top = swapAddRestForm?.offsetTop;

      window.scrollTo({ top: top, behavior: "smooth" });
    } else {
      const formData = prepareFormDataMyRest(vals);
      mutate(formData);
    }
  };

  return (
    <FormProvider {...formContext}>
      <div className="w-full grid grid-cols-1 justify-items-center gap-y-5">
        <span className="txt__04">Create new restaurant</span>

        <MyRestaurantsForm
          {...{
            formContext,
            handleSave,
            isPending,
            currFormAddress,
            setCurrFormAddress,
          }}
        />
      </div>
    </FormProvider>
  );
};
export default AddRestaurant;
