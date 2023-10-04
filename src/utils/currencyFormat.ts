export default (value: number) => {
  const BRReal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })
  return BRReal.format(value);
}
