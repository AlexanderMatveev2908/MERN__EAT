import { Location } from "react-router-dom";
import { SideDropFieldType } from "../../core/config/fieldsArr/typesFields";

export const makeConditionalStyleLocation = ({
  location,
  el,
  type,
}: {
  location: Location;
  el: SideDropFieldType;
  type?: string | null;
}) =>
  // by default i check path el with path page but to some els i set a from cause you can go in some pages only if i set state from in navigate, if the els have from i know they also set a type cause some pages are dynamic based not only route but also query, and i check the query to see if they match, i did this cause i preferred to make a little more complex page but at least have less folders and files
  el?.from && type
    ? type === el.path.split("=")[1]
      ? "active"
      : ""
    : location.pathname === el.path
    ? "active"
    : "";
