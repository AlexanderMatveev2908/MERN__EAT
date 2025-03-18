import { genID } from "../../../../../utils/utils";
import { IoCreate } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";

export const makeLinksMyRestPage = (restId: string) =>
  [
    {
      label: "Update",
      path: `/my-restaurants/update/${restId}`,
      icon: GrUpdate,
    },
    {
      label: "Add dish",
      path: `/my-dishes/add-dish`,
      icon: IoCreate,
    },
  ].map((el) => ({
    ...el,
    id: genID(),
  }));
