const create = require('./create');
const readForCalendar = require('./read-for-calendar');
const readMany = require('./read-many');
const readOne = require('./read-one');
const remove = require('./remove');
const removeMany = require('./remove-many');
const update = require('./update');
const readTime = require('./read-time');

module.exports = {
  create,
  readForCalendar,
  readMany,
  readOne,
  remove,
  removeMany,
  readTime,
  update,
};
