import { FC } from "react";
import { useChangeEmail } from "./useChangeEmail";

const ChangeEmail: FC = () => {
  const { register, errors } = useChangeEmail();

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-y-5">
      <span className="txt__03">Change Email</span>

      <form className="w-full grid grid-cols-1 justify-items-center gap-y-5"></form>
    </div>
  );
};
export default ChangeEmail;
