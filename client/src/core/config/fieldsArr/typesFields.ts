import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

export type BaseFieldType = {
  id: string;
  field: string;
  label: string;
};

export type BaseFieldShowType = Omit<BaseFieldType, "field">;

export type FieldChecker = {
  reg: RegExp;
  msg: string;
};

//  AUTH & USER

export type AuthFieldUserType = BaseFieldType &
  FieldChecker & {
    place?: string;
    svg: LucideIcon;
    type?: string;
  };

export type AuthFieldUserTypeNoSvg = Omit<AuthFieldUserType, "svg">;

export type UserDetailsFieldType = BaseFieldType & FieldChecker;

export type PwdCheckerType = BaseFieldShowType & FieldChecker;

// SIDELINK

export type SideDropFieldType = BaseFieldShowType & {
  path: string;
  svg: LucideIcon | IconType; // can be also an icon, some svg from lucide icon are really cool, but when i do not find something i go on react icons to find them cause has bigger choice, generally i do not make nothing to complex that would not allow me to treat them in the same way for styling so is ok but if you need to implement something that requires only svg you should remove icons from arrays od els
  from?: string;
};

// FOOTER

export type FooterFieldType = BaseFieldShowType & {
  path: string;
};

// SWITCH FORM

export type SwitchFormFieldType = BaseFieldShowType & {
  svg: LucideIcon;
  type: string;
};

// MY REST CARDS

type ShowCardBase = {
  id: string;
  label: string;
};

export type ShowCardMyRestArrValsIcon = ShowCardBase & {
  icon: IconType;
  vals: string[] | number[];
};

export type ShowCardMyRestArrVals = ShowCardBase & {
  vals: string[] | number[];
};

export type ShowCardMyRestTypeIcon = {
  id: string;
  icon: IconType;
  val: string;
};

export type ShowCardMyRestType = ShowCardBase & {
  val: string | number;
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
