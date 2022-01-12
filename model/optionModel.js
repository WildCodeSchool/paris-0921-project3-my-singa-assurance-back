const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllOptions = () => {
  const allSubscribers = prisma.formule.findMany();
  return allSubscribers;
};

module.exports = {
  getAllOptions,
};
