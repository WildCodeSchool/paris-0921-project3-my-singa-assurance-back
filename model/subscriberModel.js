const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
};
