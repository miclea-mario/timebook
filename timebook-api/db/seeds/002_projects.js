/* eslint-disable no-console */
const { Project } = require('../../models');
const project = require('../resources/project');

exports.seed = async () => {
  try {
    console.log('Planting seeds for projects');
    const projects = await project();
    await Project.insertMany(projects);

    console.log('✓');
  } catch (err) {
    console.warn('Error! Cannot insert projects');
    console.error(err);
  }
};
