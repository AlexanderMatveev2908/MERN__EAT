import { FC } from "react";
import DropDownHeader from "../../../components/DropDownHeader/DropDownHeader";

const DropNonLogged: FC = () => {
  return <DropDownHeader {...{ isLogged: false }} />;
};
export default DropNonLogged;
