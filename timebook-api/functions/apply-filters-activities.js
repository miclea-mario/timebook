const { addDays } = require('date-fns');

module.exports = (query) => {
  let {
    date = '',
    description = '',
    duration = '',
    editedBy = '',
    from = '',
    // project = '',
    projectId = '',
    to = '',
    // user = '',
    userId = '',
  } = query;
  let select = {};

  if (date) {
    select.date = { $regex: date, $options: 'i' };
  }

  if (from && to) {
    select = {
      ...select,
      $expr: {
        $and: [
          {
            $gte: [{ $dateFromString: { dateString: '$date' } }, new Date(from)],
          },
          {
            $lte: [{ $dateFromString: { dateString: '$date' } }, addDays(new Date(to), 1)],
          },
        ],
      },
    };
  }
  if (duration) {
    select.duration = duration;
  }
  // if (project) {
  //   select['project.name'] = { $regex: project, $options: 'i' };
  // }
  if (projectId) {
    select['project'] = projectId;
  }
  if (editedBy) {
    select['editedBy'] = { $regex: editedBy, $options: 'i' };
  }
  // if (user) {
  //   select['user.email'] = { $regex: user, $options: 'i' };
  // }
  if (userId) {
    select['user'] = userId;
  }
  if (description) {
    select.description = { $regex: description, $options: 'i' };
  }

  return {
    ...select,
  };
};
