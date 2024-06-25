const { Identity, Admin, User } = require('../../models');
const { error } = require('../../functions');

module.exports = async (req, res) => {
  const { email, role } = req.body;
  if (role !== 'admin' && role !== 'user') {
    throw error(400, 'Role is not right.');
  }

  const exists = await Identity.findOne({ email });
  if (exists) {
    throw error(400, 'Email already exists');
  }

  let document;
  if (role === 'admin') {
    document = await Admin.create(req.body);
  }
  if (role === 'user') {
    document = await User.create(req.body);
  }

  return res.status(200).json({ document, message: `${role} created succesfully` });
};
