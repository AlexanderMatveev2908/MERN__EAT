/* eslint-disable @typescript-eslint/no-explicit-any */
import { genID } from "./../../../utils/genID";
import { GrDocumentTest } from "react-icons/gr";

export type FieldCheckboxSwapType = {
  id: string;
  field: string;
  label: string;
  icon: any;
};

export const fieldTest = {
  id: genID(),
  field: "test",
  label: "Test",
  icon: GrDocumentTest,
};
