import { FC } from "react";
import ChangeEmail from "./ChangeEmail/ChangeEmail";

const ManageAccountForms: FC = () => {
  return (
    <div className="w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-5 border-orange-500 rounded-xl h-fit p-5 sm:px-10">
      <div className="w-full overflow-hidden">
        <div className="w-[300%] grid grid-cols-3 transition-all duration-500">
          <ChangeEmail />
        </div>
      </div>
    </div>
  );
};
export default ManageAccountForms;
