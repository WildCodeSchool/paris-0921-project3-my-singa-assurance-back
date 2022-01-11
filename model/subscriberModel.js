const { PrismaClient } = require('@prisma/client');
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

const getAllSubscribers = async () => {
  const allSubscribers = await prisma.subscriber.findMany();
  return allSubscribers;
};

const getOneSubscriberById = async (id) => {
  const subscriber = await prisma.subscriber.findUnique({
    where: {
      subscriber_id: Number(id),
    },
  });
  return subscriber;
};

const getOneSubscriberByEmail = async (email) => {
  const subscriber = await prisma.subscriber.findUnique({
    where: {
      email: email,
    },
  });
  return subscriber;
};

const createSubscribers = async (body) => {
  body.password = await hashPassword(body.password);
  const result = await prisma.subscriber.create({
    data: {
      ...body,
    },
  });
  return result;
};

const updateSubscribers = async (body, id) => {
  const result = await prisma.subscriber.update({
    where: { subscriber_id: Number(id) },
    data: {
      ...body,
    },
  });
  return result;
};

const deleteSubscribers = async (id) => {
  const result = await prisma.subscriber.delete({
    where: { subscriber_id: Number(id) },
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
};
