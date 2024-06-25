const readManyAsAdmin = require('./read-many-as-admin');
const readManyAsUser = require('./read-many-as-user');

module.exports = async (req, res) => {
  const { role } = req.user;

  if (role === 'admin') {
    return readManyAsAdmin(req, res);
  }

  return readManyAsUser(req, res);
};
