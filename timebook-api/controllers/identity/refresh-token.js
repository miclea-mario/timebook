const jwt = require('jsonwebtoken');
const { error, removeRefreshTokenCookie } = require('../../functions');

module.exports = async (req, res) => {
  const signedCookie = req.signedCookies[process.env.JWT_TOKEN_NAME];
  if (!signedCookie) {
    throw error(401, 'Refresh token not provided');
  }

  let payload;
  try {
    payload = jwt.verify(signedCookie, process.env.JWT_SECRET);
  } catch (err) {
    removeRefreshTokenCookie(res);
    throw error(401, 'Refresh token invalid');
  }

  // see: https://gist.github.com/ziluvatar/a3feb505c4c0ec37059054537b38fc48
  delete payload.iat;
  delete payload.exp;
  delete payload.nbf;
  delete payload.jti;

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

  return res.json({ token, message: 'Token refresh successful' });
};
