const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllOptions = async () => {
  const allOptions = await prisma.formule.findMany();
  return allOptions;
};

module.exports = {
  getAllOptions,
};
