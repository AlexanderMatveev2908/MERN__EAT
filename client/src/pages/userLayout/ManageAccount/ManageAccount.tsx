import { FC } from "react";
import { useManageAccount } from "./hooks/useManageAccount";
import ChangeEmail from "./components/ChangeEmail/ChangeEmail";

const ManageAccount: FC = () => {
  useManageAccount();

  return (
    <div className="w-full grid grid-cols-1 justify-items-center gap-5 sm:gap-y-10">
      <span className="txt__04">Manage your account</span>

      <form className="w-full max-w-[600px] justify-self-center grid grid-cols-1 border-[3px] gap-5 border-orange-500 rounded-xl h-fit p-5 sm:px-10">
        <div className="w-full overflow-hidden">
          <div className="w-[300%] grid grid-cols-3 transition-all duration-500">
            <ChangeEmail />
          </div>
        </div>
      </form>
    </div>
  );
};
export default ManageAccount;
