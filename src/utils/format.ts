export const formatCurrency = (val: number, maximumFractionDigits = 0) => {
  if (isNaN(val)) return val;
  return val.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits,
  });
};
