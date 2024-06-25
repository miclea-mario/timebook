module.exports = (query) => {
  let { role = '', name = '', order = '' } = query;
  let select = {};

  if (role) {
    select.role = role;
  }

  if (query && typeof query.active != 'undefined') {
    select.active = query.active;
  }
  if (name) {
    let reg = { $regex: name, $options: 'i' };
    select = {
      //to do:search full name
      ...select,

      $or: [{ first_name: reg }, { last_name: reg }],
    };
  }
  
  return {
    ...select,
  };
};
