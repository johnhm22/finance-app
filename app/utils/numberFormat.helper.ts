export const decimalFormatter = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'decimal',
  }).format(amount);
};
