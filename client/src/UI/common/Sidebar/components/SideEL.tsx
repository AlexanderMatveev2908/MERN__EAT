import { FC } from "react";
import { makeConditionalStyleLocation } from "../../../../utils/allUtils/conditionalStyleLocation";
import { SideDropFieldType } from "../../../../core/config/fieldsArr/typesFields";
import { useLocation, useSearchParams } from "react-router-dom";

type PropsType = {
  handleSideClick: (path: string, from?: string) => void;
  el: SideDropFieldType;
  customStyle?: string;
};

const SideEL: FC<PropsType> = ({ handleSideClick, el, customStyle }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  return (
    <button
      key={el.id}
      onClick={() => handleSideClick(el.path, el?.from)}
      className={`w-full cursor-pointer flex gap-3 group max-w-fit items-center el__after_below sideLink ${
        customStyle ?? ""
      } ${makeConditionalStyleLocation({ location, el, type })}`}
    >
      <el.svg className="svg__sidebar" />

      <span className="cursor-pointer txt__02 group-hover:text-orange-500 el__flow">
        {el.label}
      </span>
    </button>
  );
};
export default SideEL;
