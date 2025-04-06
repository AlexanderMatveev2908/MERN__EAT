import { FC } from "react";
import UserProfileField from "./UserProfileField";
import {
  userProfileFields_0,
  userProfileFields_1,
  userProfileFields_2,
} from "../../../../core/config/fieldsArr/fields";
import { UserProfileFormType } from "../hooks/UseProfileReducer/types.ts";
import { InputRefType } from "../hooks/useUserProfile.ts";

type PropsTYpe = {
  state: UserProfileFormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef_0: InputRefType;
  inputRef_1: InputRefType;
  inputRef_2: InputRefType;
};

const FormUserProfile: FC<PropsTYpe> = ({
  state,
  handleChange,
  inputRef_0,
  inputRef_1,
  inputRef_2,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 p-5 gap-y-5 h-fit transition-all duration-500">
        {userProfileFields_0.map((el, i) => (
          <UserProfileField
            key={el.id}
            {...{
              state,
              handleChange,
              el,
              inputRef: state.currForm.curr === 0 && !i ? inputRef_0 : null,
            }}
          />
        ))}
      </div>

      <div className="min-w-full grid grid-cols-1 p-5 gap-y-5 transition-all duration-500 h-fit ">
        {userProfileFields_1.map((el, i) => (
          <UserProfileField
            key={el.id}
            {...{
              state,
              handleChange,
              el,
              inputRef: state.currForm.curr === 1 && !i ? inputRef_1 : null,
            }}
          />
        ))}
      </div>

      <div className="min-w-full grid grid-cols-1 p-5 gap-y-5 transition-all duration-500 h-fit ">
        {userProfileFields_2.map((el, i) => (
          <UserProfileField
            key={el.id}
            {...{
              state,
              handleChange,
              el,
              inputRef: state.currForm.curr === 2 && !i ? inputRef_2 : null,
            }}
          />
        ))}
      </div>
    </>
  );
};
export default FormUserProfile;
