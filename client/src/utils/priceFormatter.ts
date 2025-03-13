export const priceFormatter = (price: number) =>
  price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)
    : "Free";
