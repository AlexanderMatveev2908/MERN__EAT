import { FC } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link } from "react-router-dom";

type PropsType = {
  path: string;
};

const AdminLink: FC<PropsType> = ({ path }) => {
  return (
    <Link
      to={path}
      className="absolute min-w-[150px] min-h-[50px] border-2 border-orange-500 rounded-xl bg-[#000] top-0 -translate-y-1/2 -right-6 z-20 flex gap-5 items-center px-3 pr-10 group cursor-pointer"
    >
      <MdAdminPanelSettings className="icon__base el__flow group-hover:text-orange-500" />

      <span className="txt__02 el__flow group-hover:text-orange-500">
        Admin page
      </span>
    </Link>
  );
};
export default AdminLink;
