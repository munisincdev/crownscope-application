export const capitalizeFirstLetter = (str: string) => {
  if (!str) return str;
  return str.toLowerCase().replace(/^\w/, (c) => c.toUpperCase());
};