export const orThrow = (data: any, eception: any) => {
  if (typeof data === 'undefined') {
    throw eception;
  }
  return data;
};
