export const generateHash = (len: number) => {
  // random
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};
