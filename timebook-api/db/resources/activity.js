const { Project, Identity } = require('../../models');

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
    michael: await Identity.findOne({ email: 'michael@email.com' }),
    bogdan: await Identity.findOne({ email: 'bogdan@email.com' }),
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
    {
      date: '2022-06-26',
      duration: 90,
      project: projects['timebook']._id,
      description: 'Implemented authentication',
      user: users['serban']._id,
    },
    {
      date: '2022-06-26',
      duration: 75,
      project: projects['timebook']._id,
      description: 'Designed homepage',
      user: users['leo']._id,
    },
    {
      date: '2022-06-27',
      duration: 45,
      project: projects['frsah']._id,
      description: 'Conducted user interviews',
      editedBy: admins['bogdan']._id,
      user: users['alexandra']._id,
    },
    {
      date: '2022-06-27',
      duration: 110,
      project: projects['prima']._id,
      description: 'Optimized database queries',
      user: users['serban']._id,
    },
    {
      date: '2022-06-28',
      duration: 130,
      project: projects['timebook']._id,
      description: 'Refactored codebase',
      user: users['leo']._id,
    },
    {
      date: '2022-06-28',
      duration: 95,
      project: projects['frsah']._id,
      description: 'Integrated third-party API',
      editedBy: admins['bogdan']._id,
      user: users['serban']._id,
    },
    {
      date: '2022-06-29',
      duration: 60,
      project: projects['prima']._id,
      description: 'Fixed critical bugs',
      user: users['alexandra']._id,
    },
    {
      date: '2022-06-29',
      duration: 80,
      project: projects['timebook']._id,
      description: 'Updated user roles',
      user: users['leo']._id,
    },
    {
      date: '2022-06-30',
      duration: 200,
      project: projects['frsah']._id,
      description: 'Deployed to production',
      editedBy: admins['bogdan']._id,
      user: users['serban']._id,
    },
    {
      date: '2022-06-30',
      duration: 120,
      project: projects['prima']._id,
      description: 'Reviewed codebase',
      user: users['alexandra']._id,
    },
  ];
};
