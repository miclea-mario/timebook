const { hashSync } = require('bcryptjs');

module.exports = async () => {
  return [
    {
      email: 'demo-admin@chesscoders.com',
      password: hashSync('supersecret'),
      first_name: 'Michael',
      last_name: 'Scott',
      role: 'admin',
      birthday: '2000-03-23',
      job: 'Full Admin',
      active: true,
    },
    {
      email: 'another-admin@chesscoders.com',
      password: hashSync('supersecretpassword'),
      first_name: 'Bogdan',
      last_name: 'Posedaru',
      role: 'admin',
      birthday: '1990-03-05',
      job: 'Just another admin',
      active: true,
    }
  ];
};
