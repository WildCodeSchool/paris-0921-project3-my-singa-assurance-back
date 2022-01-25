const { getAllRecipientBySubscriberId, createRecipients, updateRecipients, deleteRecipients } = require('../model/recipientModel');
const Joi = require('joi').extend(require('@joi/date'));

const { BadRequestsError } = require('../error-types');

const getMany = async (req, res) => {
  const result = await getAllRecipientBySubscriberId(req.params.id);
  res.status(200).json(result);
};

const postOne = async (req, res) => {
  const { first_name, last_name, living_country, subscriber_family_relation, birth_date, address, city, subscriber_subscriber_id, create_date } =
    req.body;
  const { error } = Joi.object({
    first_name: Joi.string().max(255).required(),
    last_name: Joi.string().max(255).required(),
    birth_date: Joi.date().format('YYYY-MM-DDTHH:mm:ssZ').required(),
    living_country: Joi.string().max(255).required(),
    subscriber_family_relation: Joi.string().max(100).required(),
    address: Joi.string().max(255).required(),
    city: Joi.string().max(255).required(),
    subscriber_subscriber_id: Joi.number().integer().required(),
    create_date: Joi.date().format('YYYY-MM-DDTHH:mm:ssZ').required(),
  }).validate(
    {
      first_name,
      last_name,
      living_country,
      subscriber_family_relation,
      birth_date,
      address,
      city,
      subscriber_subscriber_id,
      create_date,
    },
    { abortEarly: false },
  );
  if (error) throw new BadRequestsError(error.message);

  const result = await createRecipients(req.body);
  res.status(201).json(result);
};

const updateOne = async (req, res) => {
  const { error } = Joi.object({
    first_name: Joi.string().max(255),
    last_name: Joi.string().max(255),
    birth_date: Joi.date().format('YYYY-MM-DDTHH:mm:ssZ'),
    nationality: Joi.string().max(255),
    email: Joi.string().email().max(255),
    phone_number: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/),
    marital_status: Joi.string().max(100),
    sex: Joi.string().max(15),
    active: Joi.boolean(),
    recipient_qualification: Joi.string().max(100),
    living_country: Joi.string().max(255),
    subscriber_family_relation: Joi.string().max(100),
    adress: Joi.string().max(255),
    city: Joi.string().max(255),
    postal_code: Joi.number().integer(),
    last_update: Joi.date().format('YYYY-MM-DDTHH:mm:ssZ').required(),
  }).validate({ ...req.body }, { abortEarly: false });

  if (error) throw new BadRequestsError(error.message);

  const result = await updateRecipients(req.body, req.params.id);
  res.status(200).json(result);
};

const deleteOne = async (req, res) => {
  await deleteRecipients(req.params.id);
  res.status(204).send('Recipient deleted');
};

module.exports = {
  getMany,
  postOne,
  updateOne,
  deleteOne,
};
