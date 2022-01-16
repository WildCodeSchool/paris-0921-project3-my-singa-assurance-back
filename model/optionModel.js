const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllOptions = async () => {
  const allSubscribers = await prisma.formule.findMany();
  return allSubscribers;
};

module.exports = {
  getAllOptions,
};
