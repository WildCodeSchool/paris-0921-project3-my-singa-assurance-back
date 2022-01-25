const argon = require('argon2');
const jwt = require('jsonwebtoken');
const Joi = require('joi').extend(require('@joi/date'));

const { UnAuthorizedError, BadRequestsError, ConflictError } = require('../error-types');
const { getOneSubscriberByEmail, createSubscribers } = require('../model/subscriberModel');

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

const checkIfEmailExists = async (req, res) => {
  const result = await getOneSubscriberByEmail(req.params.email);
  if (result === null) res.status(204).send(`L'email n'existe pas`);
  else res.status(200).json(result);
};

const register = async (req, res) => {
  const { first_name, last_name, email, password, create_date } = req.body;
  const { error } = Joi.object({
    first_name: Joi.string().max(255).required(),
    last_name: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
      .max(255)
      .error(new Error('Le mot de passe doit contenir au minimum 8 caractères, une lettre, un chiffre et un caractère spécial')),
    create_date: Joi.date().format('YYYY-MM-DDTHH:mm:ssZ').required(),
  }).validate({ first_name, last_name, email, password, create_date }, { abortEarly: false });

  if (error) throw new BadRequestsError(error.message);

  const existingEmail = await getOneSubscriberByEmail(req.body.email);
  if (existingEmail) throw new ConflictError();

  const result = await createSubscribers(req.body);
  res.status(201).json(result);
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
        id: body.subscriber_id,
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
  register,
  checkCredentials,
  checkIfEmailExists,
};
