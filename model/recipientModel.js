const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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
};
