export const range = (
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number,
  value: number
) => {
  return ((value - fromLow) * (toHigh - toLow)) / (fromHigh - fromLow) + toLow;
};
