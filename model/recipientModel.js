const { PrismaClient } = require('@prisma/client');
const Joi = require('joi').extend(require('@joi/date'));
const argon = require('argon2');

const prisma = new PrismaClient();

const hashPassword = async (password) => {
  try {
    const hashedPassword = await argon.hash(password);
    return hashedPassword;
  } catch (err) {
    throw new Error(err.message);
  }
};

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    first_name: Joi.string().max(255).presence(presence),
    last_name: Joi.string().max(255).presence(presence),
    living_country: Joi.string().max(255).presence(presence),
    nationality: Joi.string().max(255).presence(presence),
    subscribor_family_relation: Joi.string().max(255).presence(presence),
    phone_number: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .presence(presence),
    marital_status: Joi.string().max(255).presence(presence),
    birth_date: Joi.date().format('YYYY-MM-DDTHH:mm:ssZ').raw().presence(presence),
    sex: Joi.string().max(15).presence(presence),
    email: Joi.string().email().max(255).presence(presence),
    create_date: Joi.date().format('YYYY-MM-DDTHH:mm:ssZ').presence(presence),
    last_update: Joi.date().format('YYYY-MM-DDTHH:mm:ssZ').presence(presence),
    recipient_qualification: Joi.string().max(255).presence(presence),
    password: Joi.string().min(8).max(255).presence(presence),
    address: Joi.string().max(255).presence(presence),
    Postal_code: Joi.number().integer().presence(presence),
    City: Joi.string().max(255).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const getAllRecipients = async () => {
  const allRecipients = await prisma.recipient.findMany();
  return allRecipients;
};

const getOneRecipientById = async (id) => {
  const recipient = await prisma.recipient.findUnique({
    where: {
      recipient_id: Number(id),
    },
  });
  return recipient;
};

const getOneRecipientByEmail = async (email) => {
  const recipient = await prisma.recipient.findUnique({
    where: {
      email: email,
    },
  });
  return recipient;
};

const createRecipients = async (body) => {
  body.password = await hashPassword(body.password);
  const result = await prisma.recipient.create({
    data: {
      ...body,
    },
  });
  return result;
};

const updateRecipients = async (body, id) => {
  const result = await prisma.recipient.update({
    where: { recipient_id: Number(id) },
    data: {
      ...body,
    },
  });
  return result;
};

const deleteRecipients = async (id) => {
  const result = await prisma.recipient.delete({
    where: { recipient_id: Number(id) },
  });
  return result;
};

module.exports = {
  getAllRecipients,
  getOneRecipientByEmail,
  getOneRecipientById,
  createRecipients,
  updateRecipients,
  deleteRecipients,
  validate,
};
