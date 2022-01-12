const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllOptions = async () => {
  const allSubscribers = await prisma.subscriber.findMany();
  return allSubscribers;
};

module.exports = {
  getAllOptions,
};
