export const formatPrice = (value: number, currency: "USD" | "UAH"): string => {
  const locale = currency === "USD" ? "en-US" : "uk-UA";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
};
