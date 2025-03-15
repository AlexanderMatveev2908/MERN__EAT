import { IconType } from "react-icons/lib";

/* eslint-disable @typescript-eslint/no-explicit-any */

type BaseFieldType = {
  id: string;
  field: string;
  label: string;
};

type FieldChecker = {
  reg: RegExp;
  msg: string;
};

export type AuthFieldUserType = BaseFieldType &
  FieldChecker & {
    svg: any;
    type: string;
    place?: string;
  };

export type UserDetailsFieldType = BaseFieldType & FieldChecker;

export type SideDropFieldType = Omit<BaseFieldType, "field"> & {
  path: string;
  svg: any; // can be also an icon, some svg from lucide icon are really cool, but when i do not find something i go on react icons to find them cause has bigger choice, generally i do not make nothing to complex that would not allow me to treat them in the same way for styling so is ok but if you need to implement something that requires only svg you should remove icons from arrays od els
  from?: string;
};

export type FieldNoIconType = BaseFieldType &
  FieldChecker & {
    required: boolean;
    type?: string;
    place?: string;
  };

export type SorterFieldType = BaseFieldType & {
  icon: IconType;
  subFields: RadioFieldType[] | CheckBoxFieldType[];
};

export type CheckBoxFieldType = BaseFieldType;

export type RadioFieldType = Omit<BaseFieldType, "label"> & {
  icon: IconType;
};
