const argon = require('argon2');
const jwt = require('jsonwebtoken');

const { UnAuthorizedError } = require('../error-types');
const { getOneSubscriberByEmail } = require('../model/subscriberModel');

const logIn = async (req, res) => {
  const user = await getOneSubscriberByEmail(req.body.email);
  const isValid = await verifyPassword(user.password, req.body.password);
  if (isValid) {
    const token = createToken(user);
    res.status(200).json(token);
  } else {
    throw new UnAuthorizedError();
  }
};

const verifyPassword = async (hashedPassword, password) => {
  try {
    if (await argon.verify(hashedPassword, password)) return true;
    else return false;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createToken = (body) => {
  const token = jwt.sign(
    {
      data: {
        id: body.Subscribor_id,
        email: body.email,
        firstName: body.first_name,
        lastName: body.last_name,
        birthDate: body.birth_date,
      },
    },
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256' },
  );
  return token;
};

const checkCredentials = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) throw new UnAuthorizedError();

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) throw new UnAuthorizedError(err.message);
    req.user = user;
    next();
  });
};

module.exports = {
  logIn,
  checkCredentials,
};
