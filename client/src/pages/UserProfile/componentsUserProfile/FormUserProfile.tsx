import { FC } from "react";
import UserProfileField from "./UserProfileField";
import {
  userProfileFields_0,
  userProfileFields_1,
  userProfileFields_2,
} from "../userProfileFieldsArr";
import { UserProfileFormType } from "../hooks/useProfileReducer";

type PropsTYpe = {
  state: UserProfileFormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormUserProfile: FC<PropsTYpe> = ({ state, handleChange }) => {
  return (
    <>
      <div className="grid grid-cols-1 p-5 gap-y-5 h-fit transition-all duration-500">
        {userProfileFields_0.map((el) => (
          <UserProfileField key={el.id} {...{ state, handleChange, el }} />
        ))}
      </div>

      <div className="min-w-full grid grid-cols-1 p-5 gap-y-5 transition-all duration-500 h-fit ">
        {userProfileFields_1.map((el) => (
          <UserProfileField key={el.id} {...{ state, handleChange, el }} />
        ))}
      </div>

      <div className="min-w-full grid grid-cols-1 p-5 gap-y-5 transition-all duration-500 h-fit ">
        {userProfileFields_2.map((el) => (
          <UserProfileField key={el.id} {...{ state, handleChange, el }} />
        ))}
      </div>
    </>
  );
};
export default FormUserProfile;
