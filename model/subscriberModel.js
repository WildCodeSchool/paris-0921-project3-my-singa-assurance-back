const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const subscribors = async () => {
  const allSubscribers = await prisma.subscribor.findMany();
  return allSubscribers;
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
    where: { id: Number(id) },
    data: {
      ...body,
    },
  });
  console.log(result);
  return result;
};

module.exports = {
  subscribors,
  createSubscribors,
  updateSubscribors,
};
