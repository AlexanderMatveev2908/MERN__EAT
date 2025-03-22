import { genID } from "../../../../../utils/utils";
import { IoCreate } from "react-icons/io5";
import { GrUpdate } from "react-icons/gr";
import { MdMenuBook } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { GoCodeReview } from "react-icons/go";
import { Trash2 } from "lucide-react";

export const makeLinksMyRestPage = (restId: string) =>
  [
    {
      label: "Update",
      path: `/my-restaurants/update/${restId}`,
      icon: GrUpdate,
    },
    {
      label: "Delete",
      path: "",
      icon: Trash2,
    },
    {
      label: "Add dish",
      path: `/my-dishes/add-dish`,
      icon: IoCreate,
    },
    {
      label: "My dishes",
      path: `/my-dishes`,
      icon: MdMenuBook,
    },
    {
      label: "My orders",
      path: `/my-orders`,
      icon: FaDatabase,
    },
    {
      label: "My reviews",
      path: `/my-reviews`,
      icon: GoCodeReview,
    },
  ].map((el) => ({
    ...el,
    id: genID(),
  }));
