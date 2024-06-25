const bcrypt = require('bcryptjs');
const { error } = require('../../functions');
const { Identity } = require('../../models');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user;
  const { oldPassword, newPassword } = req.body;

  if (!id || !newPassword) {
    throw error(400, 'Missing required params');
  }

  if (oldPassword === newPassword) {
    throw error(400, 'Old password and new password are identical.');
  }

  const identity = await Identity.findById(id).select('+password');
  if (!identity) {
    throw error(400, 'The id or password are incorrect.');
  }

  let requiresOldPassword = true;
  // only if an admin updates an user's password, he does need to know the user's current password.
  if (role === 'admin' && identity.role === 'user') {
    requiresOldPassword = false;
  }

  if (requiresOldPassword) {
    if (!oldPassword) {
      throw error(400, 'Missing required params');
    }

    const { password: passwordFromDb } = identity;
    const passwordsMatch = await bcrypt.compare(oldPassword, passwordFromDb);

    if (!passwordsMatch) {
      throw error(400, 'The id or password are incorrect');
    }
  }

  // TODO: create separate function, if rules get stricter
  const isNewPasswordValid = newPassword.length >= 8;
  if (!isNewPasswordValid) {
    throw error(400, 'New password should be at least 8 characters long.');
  }

  identity.password = newPassword;
  await identity.save();

  return res.status(200).json({ message: 'Password updated with success' });
};
