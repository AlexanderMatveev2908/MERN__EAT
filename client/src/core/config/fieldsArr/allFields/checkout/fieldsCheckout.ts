import { genID } from "../../../../../utils/utils";
import { emailField } from "../authFieldsUser";
import { userProfileFields_0, userProfileFields_1 } from "../userDetailsFields";
import { userProfileFields_2 } from "./../userDetailsFields";

export const fieldsAddressForm_0 = [
  // eslint-disable-next-line
  ...[emailField].map(({ svg, ...rest }) => ({
    ...rest,
    id: genID(),
    required: true,
  })),
  ...userProfileFields_0.map((el) => ({
    ...el,
    id: genID(),
    required: true,
  })),
];

const fieldsAddressForm_1 = [
  ...userProfileFields_1.map((el) => ({
    ...el,
    id: genID(),
    required: true,
  })),
];

const fieldsAddressForm_2 = [
  ...userProfileFields_2.map((el) => ({
    ...el,
    id: genID(),
    required: true,
  })),
];

export const fieldsAddressForm_all = {
  fields_0: {
    id: genID(),
    sudFields: fieldsAddressForm_0,
  },
  fields_1: {
    id: genID(),
    sudFields: fieldsAddressForm_1,
  },
  fields_2: {
    id: genID(),
    sudFields: fieldsAddressForm_2,
  },
};

export const totLenCheckoutSwap = Object.keys(fieldsAddressForm_all).length;

export const fieldsDividedByAreaCheckout = [
  [
    ...fieldsAddressForm_0.map((el) => ({
      field: el.field,
      reg: el.reg,
    })),
  ],
  [
    ...fieldsAddressForm_1.map((el) => ({
      field: el.field,
      reg: el.reg,
    })),
  ],
  [
    ...fieldsAddressForm_2.map((el) => ({
      field: el.field,
      reg: el.reg,
    })),
  ],
];

export const showOrderFields = (...params: (number | null)[]) =>
  [
    {
      label: "Subtotal",
      val: params[0],
    },
    { label: "Delivery", val: params[1] },
    {
      label: "Discount",
      val: params[2],
    },
    {
      label: "Total",
      val: params[3],
    },
  ].map((el) => ({
    ...el,
    id: genID(),
  }));

export const defaultValsFormAddress = {
  email: "",
  firstName: "",
  lastName: "",
  country: "",
  state: "",
  city: "",
  street: "",
  zipCode: "",
  phone: "",
};
