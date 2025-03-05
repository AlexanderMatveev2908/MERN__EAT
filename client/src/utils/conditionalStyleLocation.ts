/* eslint-disable @typescript-eslint/no-explicit-any */
export const makeConditionalStyleLocation = ({
  location,
  el,
  type,
}: {
  location: any;
  el: any;
  type?: string | null;
}) =>
  el?.from && type
    ? type === el.path.split("=")[1]
      ? "active"
      : ""
    : location.pathname === el.path
    ? "active"
    : "";
