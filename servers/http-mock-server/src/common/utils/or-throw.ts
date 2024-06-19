export const orThrow = (data: any, eception: any) => {
  if (!data) {
    throw eception;
  }
  return data;
};
