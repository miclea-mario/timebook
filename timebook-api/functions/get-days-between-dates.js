module.exports = (date1, date2) => {
  const fromDate = date1 > date2 ? new Date(date2) : new Date(date1);
  const toDate = date1 > date2 ? new Date(date1) : new Date(date2);

  const days =
    Math.floor(
      Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate()) -
        Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate())
    ) /
    (1000 * 60 * 60 * 24);

  return days;
};
