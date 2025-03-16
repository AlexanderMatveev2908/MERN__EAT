import { IconType } from "react-icons/lib";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type BaseFieldType = {
  id: string;
  field: string;
  label: string;
};

export type FieldChecker = {
  reg: RegExp;
  msg: string;
};

//  AUTH & USER

export type AuthFieldUserType = BaseFieldType &
  FieldChecker & {
    place?: string;
    svg?: any;
    type?: string;
  };

export type UserDetailsFieldType = BaseFieldType & FieldChecker;

export type PwdCheckerType = Omit<BaseFieldType, "field"> & FieldChecker;

// SIDELINK

export type SideDropFieldType = Omit<BaseFieldType, "field"> & {
  path: string;
  svg: any; // can be also an icon, some svg from lucide icon are really cool, but when i do not find something i go on react icons to find them cause has bigger choice, generally i do not make nothing to complex that would not allow me to treat them in the same way for styling so is ok but if you need to implement something that requires only svg you should remove icons from arrays od els
  from?: string;
};

// FOOTER

export type FooterFieldType = Omit<BaseFieldType, "field"> & {
  path: string;
};

// SWITCH FORM

export type SwitchFormFieldType = Omit<BaseFieldType, "field"> & {
  svg: any;
  type: string;
};

// MY REST CARDS

export type ShowCardMyRestTypeWithIcon = {
  id: string;
  label: string;
  icon: IconType;
  vals: string[];
};

export type ShowCardMyRestTypeSingleVal = Omit<
  ShowCardMyRestTypeWithIcon,
  "vals"
> & {
  val: number;
  icon?: IconType;
};

export type ShowCardMyRestTypeSingleValNoIcon = Omit<
  ShowCardMyRestTypeSingleVal,
  "icon"
>;

export type ShowOpenCloseTimeType = {
  id: string;
  icon: IconType;
  val: string;
};

// FORM INPUTS

export type FieldNoIconType = BaseFieldType &
  FieldChecker & {
    required: boolean;
    type?: string;
    place?: string;
  };

export type CheckBoxFieldType = BaseFieldType;

export type RadioFieldType = Omit<BaseFieldType, "label"> & {
  icon: IconType;
};

export type SearchFilterType = BaseFieldType & {
  icon: IconType;
  subFields: BaseFieldType[];
};

export type SorterFieldType = BaseFieldType & {
  icon: IconType;
  subFields: RadioFieldType[];
};
