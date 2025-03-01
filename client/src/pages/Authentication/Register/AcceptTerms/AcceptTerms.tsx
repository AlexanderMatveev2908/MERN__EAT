import { FC, useEffect, useRef } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { RegisterFormType } from "../useRegisterCustom";

type PropsTYpe = {
  register: UseFormRegister<RegisterFormType>;
  errors: FieldErrors;
  valTerms: boolean;
};

const AcceptTerms: FC<PropsTYpe> = ({ register, errors, valTerms }) => {
  const isInvalid = !!errors?.acceptedTerms?.message;
  const checkRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const handleCheck = () => {
      if (!checkRef.current) return;

      checkRef.current.classList.remove("register__checkbox");

      requestAnimationFrame(() => {
        checkRef.current?.classList.add("register__checkbox");
      });
    };

    handleCheck();
  }, [valTerms]);

  return (
    <div className="w-full grid grid-cols-1 gap-2 ">
      <label className="w-full flex gap-10 max-w-fit justify-start relative py-2 cursor-pointer items-center">
        <input
          type="checkbox"
          className="opacity-0"
          {...register("acceptedTerms", {
            required: "You must accept terms and conditions",
          })}
        />
        <span
          ref={checkRef}
          className={`absolute top-1 left-0 border-[3px] rounded-xl w-[30px] sm:w-[35px] h-[30px] sm:h-[35px] cursor-pointer ${
            !valTerms
              ? valTerms === undefined
                ? "border-white"
                : "border-red-600"
              : "border-green-600"
          }`}
        ></span>
        <span
          className={`absolute delay-75 -top-2 sm:-top-3 left-4 w-3 sm:w-4 h-8 sm:h-10 border-r-4 border-b-4 rotate-45 border-green-600 transition-all duration-300 cursor-pointer ${
            !valTerms ? "scale-0" : "scale-100"
          }`}
        ></span>
        <span
          className={`txt__01 transition-all duration-300 ${
            !valTerms
              ? valTerms === undefined
                ? "border-white"
                : "hover:text-red-600"
              : "hover:text-green-600"
          }`}
        >
          I Accept Terms And Conditions
        </span>
      </label>

      {isInvalid && (
        <span className="txt__00 text-red-600">
          {errors?.acceptedTerms?.message as string}
        </span>
      )}
    </div>
  );
};
export default AcceptTerms;
