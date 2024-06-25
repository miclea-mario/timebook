const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { error } = require('../../functions');
const { Identity } = require('../../models');

module.exports = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw error(400, 'Missing required params');
  }

  const identity = await Identity.findOne({ email }).select('+password');
  if (!identity) {
    throw error(400, 'Your email or password are invalid');
  }

  // Block logins for accounts with too many retries
  if (identity?.retries >= 5) {
    await identity.updateOne({ active: false });
    throw error(400, 'Your account has been locked for security reasons');
  }

  const { id, name, active, __t: role, password: passwordFromDb, first_name, last_name } = identity;
  if (!active) {
    throw error(400, 'Your account is not active, yet');
  }

  const passwordsMatch = await bcrypt.compare(password, passwordFromDb);
  if (!passwordsMatch) {
    throw error(400, 'Your username or password are invalid');
  }

  // the JWT public data payload
  const payload = { name, email, role, me: id, first_name, last_name, _id: id };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '15m',
    algorithm: 'HS256',
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

  // set refresk token as cookie
  const sevenDays = 7 * 24 * 3600 * 1000;
  res.cookie(process.env.JWT_TOKEN_NAME, refreshToken, {
    domain: process.env.COOKIE_DOMAIN,
    secure: true,
    maxAge: sevenDays,
    signed: true,
    httpOnly: true,
    sameSite: 'lax',
  });

  // Add last login information to the current user
  await identity.updateOne({ lastLoginAt: Date.now() });

  return res.status(200).json({ token, message: 'Authentication successful' });
};
