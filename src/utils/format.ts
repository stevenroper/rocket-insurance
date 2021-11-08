export const formatCurrency = (val: number) => {
  if (isNaN(val)) return val;
  return val.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
};
