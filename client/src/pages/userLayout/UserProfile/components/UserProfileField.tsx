import { FC } from "react";
import { UserProfileFormType } from "../hooks/UseProfileReducer/types/types";
import { UserDetailsFieldType } from "../../../../config/fieldsArr/userDetailsFields";
import { InputRefType } from "../hooks/useUserProfile";

type PropsType = {
  el: UserDetailsFieldType;
  state: UserProfileFormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: InputRefType;
};

const UserProfileField: FC<PropsType> = ({
  el,
  state,
  handleChange,
  inputRef,
}) => {
  const errObj = state.errs?.[el.field];

  return (
    <label key={el.id} className="w-full flex flex-col gap-y-2">
      <span className="txt__02">{el.label}</span>

      <input
        ref={inputRef}
        onChange={handleChange}
        type="text"
        className="w-full outline-none px-5 py-1 txt__01 border-2 border-orange-500 rounded-full focus__base transition-all duration-300"
        placeholder={`${el.label}`}
        name={el.field}
        value={state.user[el.field]}
      />

      {!!Object.keys(errObj ?? {}).length && (
        <span className="txt__00 text-red-600">
          {errObj?.required || errObj?.msg || ""}
        </span>
      )}
    </label>
  );
};
export default UserProfileField;
