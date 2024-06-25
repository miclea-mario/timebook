module.exports = (n) => {
  let hours = Math.floor(n / 60);
  let minutes = n % 60;
  let quarters = Math.floor(minutes / 15) + !!(minutes % 15);
  if (quarters >= 4) return hours + 1;
  return hours + (quarters * 25) / 100;
};
