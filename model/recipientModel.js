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
  body.password = await hashPassword(body.password);
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
