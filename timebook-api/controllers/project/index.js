const readMany = require('./read-many');
const create = require('./create');
const readOne = require('./read-one');
const readTimesheet = require('./read-timesheet');
const remove = require('./remove');
const update = require('./update');

module.exports = {
  create,
  readMany,
  readOne,
  readTimesheet,
  remove,
  update,
};
