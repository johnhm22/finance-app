export const decimalFormatter = (amount: number): string => {
  return Number(new Intl.NumberFormat('en-US', {
    style: 'decimal',
  }).format(amount)).toFixed(2);
};
