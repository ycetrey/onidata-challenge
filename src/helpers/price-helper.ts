const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const formatPrice = (n: string) => {
  let valor = parseFloat(n);
  if (isNaN(valor)) valor = 0;
  return BRL.format(valor);
};
