import currency from "currency.js";

export const euro = (value: number) =>
  currency(value, {
    symbol: "€",
    separator: ".",
    decimal: ",",
    pattern: "# !",
    negativePattern: "-# !",
  });
