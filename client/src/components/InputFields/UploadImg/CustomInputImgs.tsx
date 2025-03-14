import { FC } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyRestaurantsAddUpdateFormType } from "../../../types/myRestaurants";

type PropsType = {
  register: UseFormRegister<MyRestaurantsAddUpdateFormType>;
  watch: UseFormWatch<MyRestaurantsAddUpdateFormType>;
};

const CustomInputImgs: FC<PropsType> = ({ register, watch }) => {
  return (
    <div className="w-full grid ">
      <label className="w-fit grid relative">
        <input
          type="file"
          multiple
          className="opacity-0 absolute"
          {...register("images", {
            validate: () => {
              const images = watch("images");

              if (!images?.length) return "You should upload at least one img";
              if (images?.length > 5) return "You can upload up to 5 images";

              return true;
            },
          })}
        />

        <button
          type="button"
          onClick={(e) => {
            (
              e?.currentTarget?.previousElementSibling as HTMLInputElement
            )?.click();
          }}
          className="w-full flex items-center gap-3 group el__flow hover:scale-110 hover:text-orange-500 pl-5 pr-14 py-2 border-[3px] border-orange-500 rounded-xl cursor-pointer justify-self-start"
        >
          <FaCloudUploadAlt className="h-[35px] w-[35px]" />

          <span className="txt__02">Upload</span>
        </button>
      </label>
    </div>
  );
};
export default CustomInputImgs;
