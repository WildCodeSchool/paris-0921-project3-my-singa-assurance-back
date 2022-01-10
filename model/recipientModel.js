const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllRecipientBySubscriberId = async (id) => {
  const recipients = await prisma.recipient.findMany({
    where: {
      subscriber_subscriber_id: Number(id),
    },
  });
  return recipients;
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
  getAllRecipientBySubscriberId,
  createRecipients,
  updateRecipients,
  deleteRecipients,
};
