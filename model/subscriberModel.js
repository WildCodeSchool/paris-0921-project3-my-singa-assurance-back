const { PrismaClient } = require('@prisma/client');
const Joi = require('joi').extend(require('@joi/date'));

const prisma = new PrismaClient();

const validate = (data, forCreation = true) => {
  const presence = forCreation ? 'required' : 'optional';
  return Joi.object({
    email: Joi.string().email().max(255).presence(presence),
    first_name: Joi.string().max(255).presence(presence),
    last_name: Joi.string().max(255).presence(presence),
    birth_date: Joi.date().format('YYYY-MM-DD').presence(presence),
    living_country: Joi.string().max(255).presence(presence),
    nationality: Joi.string().max(255).presence(presence),
    address: Joi.string().max(255).presence(presence),
    Postal_code: Joi.number().integer().presence(presence),
    City: Joi.string().max(255).presence(presence),
    phone_number: Joi.string()
      .regex(/^[0-9]{10}$/)
      .presence(presence),
    marital_status: Joi.string().max(255).presence(presence),
  }).validate(data, { abortEarly: false }).error;
};

const getAllSubscribors = async () => {
  const allSubscribers = await prisma.subscribor.findMany();
  return allSubscribers;
};

const getOneSubscriborById = async (id) => {
  const subscriber = await prisma.subscribor.findUnique({
    where: {
      Subscribor_id: Number(id),
    },
  });
  return subscriber;
};

const getOneSubscriborByEmail = async (email) => {
  const subscriber = await prisma.subscribor.findUnique({
    where: {
      email: email,
    },
  });
  return subscriber;
};

const createSubscribors = async (body) => {
  const result = await prisma.subscribor.create({
    data: {
      ...body,
    },
  });
  return result;
};

const updateSubscribors = async (body, id) => {
  const result = await prisma.subscribor.update({
    where: { Subscribor_id: Number(id) },
    data: {
      ...body,
    },
  });
  return result;
};

const deleteSubscribors = async (id) => {
  const result = await prisma.subscribor.delete({
    where: { Subscribor_id: Number(id) },
  });
  return result;
};

module.exports = {
  getAllSubscribors,
  getOneSubscriborById,
  getOneSubscriborByEmail,
  createSubscribors,
  updateSubscribors,
  deleteSubscribors,
  validate,
};
