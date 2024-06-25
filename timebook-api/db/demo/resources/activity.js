const { Project, Identity } = require('../../../models');

module.exports = async () => {
  const projects = {
    timebook: await Project.findOne({ name: 'Timebook' }),
    prima: await Project.findOne({ name: 'Prima Development' }),
    frsah: await Project.findOne({ name: 'FRSah ERP' }),
  };

  const users = {
    serban: await Identity.findOne({ last_name: 'Capatina' }),
    leo: await Identity.findOne({ last_name: 'Ionescu' }),
    alexandra: await Identity.findOne({ last_name: 'Sfetcu' }),
  };

  const admins = {
    michael: await Identity.findOne({ email: 'demo-admin@chesscoders.com' }),
    bogdan: await Identity.findOne({ email: 'another-admin@chesscoders.com' }),
  };

  return [
    {
      date: '2022-06-23',
      duration: 100,
      project: projects['timebook']._id,
      description: 'Initialized Project',
      user: users['serban']._id,
    },
    {
      date: '2022-06-23',
      duration: 120,
      project: projects['timebook']._id,
      description: 'Updated environment variables',
      user: users['leo']._id,
    },
    {
      date: '2022-06-24',
      duration: 60,
      project: projects['timebook']._id,
      description: 'Cloned repos',
      user: users['alexandra']._id,
    },
    {
      date: '2021-06-24',
      duration: 210,
      project: projects['frsah']._id,
      description: 'Added online payment solution',
      editedBy: admins['bogdan']._id,
      user: users['serban']._id,
    },
    {
      date: '2022-06-25',
      duration: 15,
      project: projects['prima']._id,
      description: 'Updates app logo',
      user: users['leo']._id,
    },
    {
      date: '2022-06-25',
      duration: 120,
      project: projects['prima']._id,
      description: 'Bugfixing',
      user: users['alexandra']._id,
    },
  ];
};
