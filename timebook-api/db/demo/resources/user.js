const { hashSync } = require('bcryptjs');

module.exports = async () => {
  return [
    {
      email: 'jim@email.com',
      password: hashSync('supersecret'),
      first_name: 'Jim',
      last_name: 'Halpert',
      role: 'user',
      birthday: '2000-03-23',
      job: 'developer',
      active: false,
      icon: 'fa-regular fa-circle-5',
    },
    {
      email: 'demo-user@chesscoders.com',
      password: hashSync('supersecret'),
      first_name: 'Pam',
      last_name: 'Beesly',
      role: 'user',
      birthday: '2000-08-30',
      job: 'developer',
      active: true,
      icon: 'fa-solid fa-circle',
    },
    {
      email: 'serban@chesscoders.com',
      password: hashSync('supersecretpassword'),
      first_name: 'Serban',
      last_name: 'Capatina',
      role: 'user',
      birthday: '2000-08-30',
      job: 'Intern Web Developer',
      active: true,
    },
    {
      email: 'leonard@chesscoders.com',
      password: hashSync('supersecretpassword'),
      first_name: 'Leonard',
      last_name: 'Ionescu',
      role: 'user',
      birthday: '2000-08-30',
      job: 'Intern Web Developer',
      active: true,
    },
    {
      email: 'alexandra@chesscoders.com',
      password: hashSync('supersecretpassword'),
      first_name: 'Alexandra',
      last_name: 'Sfetcu',
      role: 'user',
      birthday: '1999-08-30',
      job: 'Intern Web Developer',
      active: true,
    },
  ];
};
