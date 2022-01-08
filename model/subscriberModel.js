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
    email: Joi.string().email().max(255).presence(presence),
    first_name: Joi.string().max(255).presence(presence),
    last_name: Joi.string().max(255).presence(presence),
    birth_date: Joi.date().format('YYYY-MM-DDTHH:mm:ssZ').raw().presence(presence),
    living_country: Joi.string().max(255).presence(presence),
    nationality: Joi.string().max(255).presence(presence),
    address: Joi.string().max(255).presence(presence),
    Postal_code: Joi.number().integer().presence(presence),
    City: Joi.string().max(255).presence(presence),
    phone_number: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .presence(presence),
    marital_status: Joi.string().max(255).presence(presence),
    create_date: Joi.date().format('YYYY-MM-DDTHH:mm:ssZ').presence(presence),
    last_update: Joi.date().format('YYYY-MM-DDTHH:mm:ssZ').presence(presence),
    password: Joi.string().min(8).max(255).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const getAllSubscribers = async () => {
  const allSubscribers = await prisma.subscribor.findMany();
  return allSubscribers;
};

const getOneSubscriberById = async (id) => {
  const subscriber = await prisma.subscribor.findUnique({
    where: {
      Subscribor_id: Number(id),
    },
  });
  return subscriber;
};

const getOneSubscriberByEmail = async (email) => {
  const subscriber = await prisma.subscribor.findUnique({
    where: {
      email: email,
    },
  });
  return subscriber;
};

const createSubscribers = async (body) => {
  body.password = await hashPassword(body.password);
  const result = await prisma.subscribor.create({
    data: {
      ...body,
    },
  });
  return result;
};

const updateSubscribers = async (body, id) => {
  const result = await prisma.subscribor.update({
    where: { Subscribor_id: Number(id) },
    data: {
      ...body,
    },
  });
  return result;
};

const deleteSubscribers = async (id) => {
  const result = await prisma.subscribor.delete({
    where: { Subscribor_id: Number(id) },
  });
  return result;
};

module.exports = {
  getAllSubscribers,
  getOneSubscriberByEmail,
  getOneSubscriberById,
  createSubscribers,
  updateSubscribers,
  deleteSubscribers,
  validate,
};
