const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const stringPriceToFloat = (price: string) => {
  price = price.replace("R$ ", "");
  price = price.replace(".", "");
  price = price.replace(",", ".");
  return price;
};

export const formatPrice = (n: string) => {
  return BRL.format(+n);
};
