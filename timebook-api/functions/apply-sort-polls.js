module.exports = (query) => {
  let { date = '' } = query;

  let options = { createdAt: -1 };

  if (date) {
    const split = date.split(' ');
    const sortBy = split[0];
    const order = split[1];

    options = { ...options, [sortBy]: order === 'asc' ? -1 : 1 };
  }

  return { ...options };
};
