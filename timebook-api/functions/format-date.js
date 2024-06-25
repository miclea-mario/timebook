module.exports = (date) => {
  const new_date = new Date(date);
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-GB', options, ['ban', 'id']).format(new_date);
};
