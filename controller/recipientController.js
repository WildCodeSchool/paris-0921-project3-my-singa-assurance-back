const {
  getAllRecipients,
  getOneRecipientByEmail,
  getOneRecipientById,
  createRecipients,
  updateRecipients,
  deleteRecipients,
  validate,
} = require('../model/recipientModel');

const { BadRequestsError, ConflictError } = require('../error-types');

const getMany = async (req, res) => {
  const result = await getAllRecipients();
  res.status(200).json(result);
};

const getOneById = async (req, res) => {
  const result = await getOneRecipientById(req.params.id);
  res.status(200).json(result);
};

const postOne = async (req, res) => {
  const validatingError = validate(req.body);
  if (validatingError) throw new BadRequestsError();

  const existingEmail = await getOneRecipientByEmail(req.body.email);
  if (existingEmail) throw new ConflictError();

  const result = await createRecipients(req.body);
  res.status(201).json(result);
};

const updateOne = async (req, res) => {
  const result = await updateRecipients(req.body, req.params.id);
  res.status(200).json(result);
};

const deleteOne = async (req, res) => {
  await deleteRecipients(req.params.id);
  res.status(204).send('Recipient deleted');
};

module.exports = {
  getMany,
  getOneById,
  postOne,
  updateOne,
  deleteOne,
};
