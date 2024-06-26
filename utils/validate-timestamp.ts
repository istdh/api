export const isExpired = (time: number) => {
  const currentTime = Math.floor(Date.now() / 1000);

  return currentTime > time ? true : false;
};
