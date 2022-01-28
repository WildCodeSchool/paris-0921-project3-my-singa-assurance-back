const { getAllSubscribers, getOneSubscriberById, updateSubscribers, deleteSubscribers } = require('../model/subscriberModel');
const Joi = require('joi').extend(require('@joi/date'));

const { BadRequestsError } = require('../error-types');

const getMany = async (req, res) => {
  const result = await getAllSubscribers();
  res.status(200).json(result);
};

const getOneById = async (req, res) => {
  const result = await getOneSubscriberById(req.params.id);
  res.status(200).json(result);
};

const updateOne = async (req, res) => {
  const { error } = Joi.object({
    first_name: Joi.string().max(255),
    last_name: Joi.string().max(255),
    email: Joi.string().email().max(255),
    birth_date: Joi.date().format('YYYY-MM-DDTHH:mm:ssZ'),
    password: Joi.string()
      .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
      .max(255)
      .error(new Error('Le mot de passe doit contenir au minimum 8 caractères, une lettre, un chiffre et un caractère spécial')),
    living_country: Joi.string().max(255),
    nationality: Joi.string().max(255),
    address: Joi.string().max(255),
    postal_code: Joi.number().integer(),
    city: Joi.string().max(255),
    phone_number: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/),
    marital_status: Joi.string().max(255),
    last_update: Joi.date().format('YYYY-MM-DDTHH:mm:ssZ').required(),
  }).validate({ ...req.body }, { abortEarly: false });

  if (error) throw new BadRequestsError(error.message);

  const result = await updateSubscribers(req.body, req.params.id);
  res.status(200).json(result);
};

const deleteOne = async (req, res) => {
  await deleteSubscribers(req.params.id);
  res.status(204).send('Subscriber deleted');
};

module.exports = {
  getMany,
  getOneById,
  updateOne,
  deleteOne,
};
