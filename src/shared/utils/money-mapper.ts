export const moneyMapper = (value: number) => {
  return value.toLocaleString('pr-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
