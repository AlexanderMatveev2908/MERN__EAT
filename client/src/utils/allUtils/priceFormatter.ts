export const priceFormatter = ({
  price,
  showStr = false,
}: {
  price: number;
  showStr?: boolean;
}) => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price ?? 0);

  if (!price && showStr) return "Free";

  return formatted;
};
