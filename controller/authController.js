const argon = require('argon2');
const jwt = require('jsonwebtoken');

const { UnAuthorizedError } = require('../error-types');
const { getOneSubscriborByEmail } = require('../model/subscriberModel');

const logIn = async (req, res) => {
  const user = await getOneSubscriborByEmail(req.body.email);
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
    'PetitPandaDanslesChamps',
    { algorithm: 'HS256' },
  );
  return token;
};

module.exports = {
  logIn,
};
