const { hashSync } = require('bcryptjs');

module.exports = async () => {
  return [
    {
      email: 'michael@email.com',
      password: hashSync('supersecretpassword'),
      first_name: 'Michael',
      last_name: 'Scott',
      role: 'admin',
      birthday: '2000-03-23',
      job: 'developer',
      active: true,
      hoursPerDay: 8,
    },
    {
      email: 'bogdan@email.com',
      password: hashSync('supersecretpassword'),
      first_name: 'Bogdan',
      last_name: 'Posedaru',
      role: 'admin',
      birthday: '1990-03-05',
      job: 'Chief Operational Officer',
      active: true,
      hoursPerDay: 8,
    },
  ];
};
