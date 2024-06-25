const createAsAdmin = require('./create-as-admin');
const createAsUser = require('./create-as-user');

module.exports = async (req, res) => {
  const { role } = req.user;

  if (role === 'admin') {
    return createAsAdmin(req, res);
  }

  return createAsUser(req, res);
};
