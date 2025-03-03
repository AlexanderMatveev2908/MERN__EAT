import { FC } from "react";
import { userProfileFields_0 } from "./userProfileFieldsArr";
import { useUserProfile } from "./useUserProfile";

const UserProfile: FC = () => {
  const { register, errors } = useUserProfile();

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-y-5">
      <span className="txt__04">Your Profile Details</span>

      <form className="w-full max-w-[500px] justify-self-center border-[3px] border-orange-500 rounded-xl grid grid-cols-1">
        <div className="w-full grid grid-cols-1 p-5 gap-y-5">
          {userProfileFields_0.map((el) => (
            <label key={el.id} className="w-full flex flex-col gap-y-2">
              <span className="txt__02">{el.label}</span>

              {el.field === "email" ? (
                <input
                  type="text"
                  className="w-full outline-none px-5 py-1 txt__01 border-2 border-orange-500 rounded-full focus__base transition-all duration-300"
                />
              ) : (
                <input
                  type="text"
                  className="w-full outline-none px-5 py-1 txt__01 border-2 border-orange-500 rounded-full focus__base transition-all duration-300"
                  placeholder={`${el.label}`}
                  {...register(el.field, {
                    required: `${el.label} is required`,
                    pattern: {
                      value: el.reg,
                      message: el.msg,
                    },
                  })}
                />
              )}

              {errors?.[el.field]?.message && (
                <span className="txt__00">{errors[el.field]?.message}</span>
              )}
            </label>
          ))}
        </div>
      </form>
    </div>
  );
};
export default UserProfile;
