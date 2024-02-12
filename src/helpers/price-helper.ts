const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const formatPrice = (n: string) => {
  return BRL.format(+n);
};
